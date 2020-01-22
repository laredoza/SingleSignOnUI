import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {Subscription, Subject} from 'rxjs';
import {ClientService} from '../client.service';
import { Sort, MatSort, MatPaginator, PageEvent} from '@angular/material';
import {Client} from 'src/app/client-management/models/client';
import {MessagingService} from 'src/app/services/messaging.service';
import { DataSourceRequest } from 'src/app/Modules/dataSource-request';
import { DataSourceRequestFilter } from 'src/app/Modules/dataSource-request-filter';
import { DataSourceOperator } from 'src/app/Modules/dataSource-operator';
import { DataSourceLogic } from 'src/app/Modules/dataSource-logic';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DataSourceResponse } from 'src/app/Modules/dataSource-response';
import { DatasourceSort } from 'src/app/Modules/datasource-sort.';
import { DataSourceSortDirection } from 'src/app/Modules/dataSource-sort-direction';
import * as XLSX from 'xlsx';

@Component({selector: 'app-client-list', templateUrl: './client-list.component.html', styleUrls: ['./client-list.component.scss']})
export class ClientListComponent implements AfterViewInit, OnInit {
    public expanded = false;
    isDesktop = false;
    watcher: Subscription;
    activeMediaQuery = '';
    filteredText = '';
    xsClass = 'tool-bar-small';
    clientService: ClientService;
    displayedColumns: string[] = [];
    isLoadingResults = true;
    refreshTimer: any;
    refreshInterval = 60 * 5; // 5 minutes
    actionIcon = 'edit';
    pageTitle = 'Client Management';
    messageService: MessagingService;

    searchUpdate = new Subject<string>();
    dataSource: DataSourceResponse<Client[]>;
    dataSourceRequest = new DataSourceRequest();
    searchFilter = '';
    private paginator: MatPaginator;
    private sort: MatSort;

    @ViewChild(MatSort, {static: false})set matSort(ms: MatSort) {
        this.sort = ms;
        if (this.sort)
        {
            if (this.dataSourceRequest.sort.length > 0)
            {
                this.sort.active = this.dataSourceRequest.sort[0].field;
                this.sort.direction = this.dataSourceRequest.sort[0].ReturnMastsortDirection();
            }
        }
    }

    @ViewChild(MatPaginator, {static: false})set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setPaginatorValues();
    }

    setPaginatorValues() {
        if (this.paginator)
        {
            this.paginator.length = this.dataSource.total; 
            this.paginator.pageIndex = this.dataSourceRequest.currentPage;
            this.paginator.pageSize = this.dataSourceRequest.pageSize;
        }
    }

    constructor(
        mediaObserver: MediaObserver, 
        clientService: ClientService, messageService: MessagingService) {
        this.clientService = clientService;
        this.messageService = messageService;
        this.dataSourceRequest.pageSize = 10;
        this.dataSourceRequest.sort.push(new DatasourceSort('clientName', DataSourceSortDirection.Desc));

        // Debounce search.
        this.searchUpdate.pipe(
            debounceTime(400),
            distinctUntilChanged())
            .subscribe(async (value) => {
                await this.onSearch(value);
            });
        
        this.dataSource = new DataSourceResponse<Client[]>();
        this.dataSource.data = new Array<Client>();

        this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
            this.activeMediaQuery = change ? `'${
                change.mqAlias
            }' = (${
                change.mediaQuery
            })` : '';
            if (change.mqAlias == 'xs') {
                this.isDesktop = false;
            } else {
                this.isDesktop = true;
            }
        });
    }

    async ngOnInit() {
        this.InitializeGridColumns();
        this.startAutoRefresh();
        this.dataSource = await this.loadData(false);
    }

    async ngAfterViewInit() {
    }

    public toggleDisplayFilter(): void {
        this.expanded = !this.expanded;
    }

    InitializeGridColumns() {
        this.displayedColumns.push('clientId');
        this.displayedColumns.push('clientName');
        this.displayedColumns.push('description');
        this.displayedColumns.push('identityTokenLifetime');
        this.displayedColumns.push('accessTokenLifetime');
        this.displayedColumns.push('enabled');
        this.displayedColumns.push('created');
        this.displayedColumns.push('edit');
    }

    async loadData(all:boolean) : Promise<DataSourceResponse<Client[]>> {
        this.isLoadingResults = true;
        const originalRequest = this.dataSourceRequest.pageSize;

        try {
            if (all)
            {
                this.dataSourceRequest.pageSize = 0;
            }
            
            const result = await this.clientService.returnClients(this.dataSourceRequest).toPromise();

            if (all)
            {
                this.dataSourceRequest.pageSize = originalRequest;
            }

            const mappedData = [... result.data].map((row: Client) => {
                if (row.allowedGrantTypes && row.allowedGrantTypes.length > 0) {
                    row.displaySecret = row.allowedGrantTypes[0].grantType === 'ClientCredentials' || row.allowedGrantTypes[0].grantType === 'ResourceOwnerPassword' || row.allowedGrantTypes[0].grantType === 'Hybrid';

                    row.displayRedirectUrl = row.allowedGrantTypes[0].grantType === 'Hybrid' || row.allowedGrantTypes[0].grantType === 'Code' || row.allowedGrantTypes[0].grantType === 'Implicit';

                    row.displayLogoutUrl = row.allowedGrantTypes[0].grantType === 'Hybrid' || row.allowedGrantTypes[0].grantType === 'Code' || row.allowedGrantTypes[0].grantType === 'Implicit';
                    row.displayCors = row.allowedGrantTypes[0].grantType === 'Code' || row.allowedGrantTypes[0].grantType === 'Implicit';
                }

                return row;
            });
            this.isLoadingResults = false;
            return result;
        } catch (err) {
            this.messageService.displayMessage('Failed loading clients');

            if (all)
            {
                this.dataSourceRequest.pageSize = originalRequest;
            }
            this.isLoadingResults = false;
        }
    }

    startAutoRefresh() {
        this.refreshTimer = setInterval(async () => {
            await this.refresh();
        }, this.refreshInterval * 1000);
    }

    pauseAutoRefresh() {
        clearInterval(this.refreshTimer);
    }

    async refresh() {
        this.dataSource = await this.loadData(false);
    }

    async onSearch(value: string): Promise<void> {
        value = value || '';
        value = value.trim().toLowerCase();

        if (value !== '')
        {
            this.dataSourceRequest.filter = new DataSourceRequestFilter("", DataSourceOperator.Contains,value == '' ? null : value, DataSourceLogic.Or)
            this.dataSourceRequest.filter.filters = new Array<DataSourceRequestFilter>();
            this.dataSourceRequest.filter.filters.push(new DataSourceRequestFilter("ClientName.ToLower()", DataSourceOperator.Contains,value == '' ? null : value, DataSourceLogic.Or));
            this.dataSourceRequest.filter.filters.push(new DataSourceRequestFilter("ClientId.ToLower()", DataSourceOperator.Contains,value == '' ? null : value, DataSourceLogic.Or));
            this.dataSourceRequest.filter.filters.push(new DataSourceRequestFilter("Description.ToLower()", DataSourceOperator.Contains,value == '' ? null : value, DataSourceLogic.Or));
        }
        else
        {
            this.dataSourceRequest.filter = new DataSourceRequestFilter(null, DataSourceOperator.None,null, DataSourceLogic.None);
        }

        this.dataSource = await this.loadData(false);
    }

    public clearFilters()
    {
        this.dataSourceRequest.filter = new DataSourceRequestFilter(null, DataSourceOperator.None,null, DataSourceLogic.None);
        this.searchFilter = "";
    }

    
    async pagingChanged(pageEvent: PageEvent) {
        this.dataSourceRequest.currentPage = pageEvent.pageIndex;
        this.dataSourceRequest.pageSize = pageEvent.pageSize;
        this.dataSource = await this.loadData(false);
    }

    async sortData(sortChange: Sort) {
        this.dataSourceRequest.sort = new Array<DatasourceSort>();

        if (sortChange.direction !== '') {
            this.dataSourceRequest.sort.push(new DatasourceSort(this.sort.active, DataSourceSortDirection.None));
            this.dataSourceRequest.sort[0].updateDirectionByMatSort(sortChange.direction);
        }

        this.dataSource = await this.loadData(false);
    }

    sortDirection() {
        if (this.dataSourceRequest.sort.length > 0)
        {
            return this.dataSourceRequest.sort[0].dir;
        }

        return '';
    }

    sortActive() {
        if (this.dataSourceRequest.sort.length > 0)
        {
            return this.dataSourceRequest.sort[0].field;
        }

        return ""; 
    }

    async export()
    {
        const dataExport = await this.loadData(true);
        const workSheet = XLSX.utils.json_to_sheet(dataExport.data, {header:['dataprop1', 'dataprop2']});
        const workBook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
        XLSX.writeFile(workBook, 'Clients.xlsx');
    }
}
