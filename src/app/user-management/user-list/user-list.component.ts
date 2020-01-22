import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { UserService } from "../user.service";
import {
  MatTableDataSource,
  MatSort,
  Sort,
  MatPaginator,
  PageEvent
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { MessagingService } from "src/app/services/messaging.service";
import { MediaObserver, MediaChange } from "@angular/flex-layout";

import { User } from "../models/user";
import { DataSourceResponse } from "src/app/Modules/dataSource-response";
import { DataSourceRequest } from "src/app/Modules/dataSource-request";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DatasourceSort } from "src/app/Modules/datasource-sort.";
import { DataSourceSortDirection } from "src/app/Modules/dataSource-sort-direction";
import * as XLSX from "xlsx";
import { DataSourceRequestFilter } from "src/app/Modules/dataSource-request-filter";
import { DataSourceOperator } from "src/app/Modules/dataSource-operator";
import { DataSourceLogic } from "src/app/Modules/dataSource-logic";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  public expanded = false;
  isDesktop = false;
  watcher: Subscription;
  activeMediaQuery = "";
  filteredText = "";
  xsClass = "tool-bar-small";
  service: UserService;
  displayedColumns: string[] = [];
  isLoadingResults = true;
  regExpr: any;
  refreshTimer: any;
  refreshInterval = 60 * 5; // 5 minutes
  actionIcon = "edit";
  pageTitle = "User Management";
  messageService: MessagingService;

  searchUpdate = new Subject<string>();
  dataSource: DataSourceResponse<User[]>;
  dataSourceRequest = new DataSourceRequest();
  searchFilter = "";
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.sort) {
      if (this.dataSourceRequest.sort.length > 0) {
        this.sort.active = this.dataSourceRequest.sort[0].field;
        this.sort.direction = this.dataSourceRequest.sort[0].ReturnMastsortDirection();
      }
    }
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setPaginatorValues();
  }

  setPaginatorValues() {
    if (this.paginator) {
      this.paginator.length = this.dataSource.total;
      this.paginator.pageIndex = this.dataSourceRequest.currentPage;
      this.paginator.pageSize = this.dataSourceRequest.pageSize;
    }
  }

  constructor(
    mediaObserver: MediaObserver,
    service: UserService,
    messageService: MessagingService
  ) {
    this.service = service;
    this.messageService = messageService;

    this.dataSourceRequest.pageSize = 10;
    this.dataSourceRequest.sort.push(
      new DatasourceSort("userName", DataSourceSortDirection.Desc)
    );

    // Debounce search.
    this.searchUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(async value => {
        await this.onSearch(value);
      });

    this.dataSource = new DataSourceResponse<User[]>();
    this.dataSource.data = new Array<User>();

    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change
        ? `'${change.mqAlias}' = (${change.mediaQuery})`
        : "";
      if (change.mqAlias == "xs") {
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

  public toggleDisplayFilter(): void {
    this.expanded = !this.expanded;
  }

  InitializeGridColumns() {
    this.displayedColumns.push("userName");
    this.displayedColumns.push("email");
    this.displayedColumns.push("lockoutEnabled");
    this.displayedColumns.push("accessFailedCount");
    this.displayedColumns.push("edit");
  }

  async loadData(all: boolean): Promise<DataSourceResponse<User[]>> {
    this.isLoadingResults = true;
    const originalRequest = this.dataSourceRequest.pageSize;

    try {
      if (all) {
        this.dataSourceRequest.pageSize = 0;
      }

      const result = await this.service
        .returnUsers(this.dataSourceRequest)
        .toPromise();

      if (all) {
        this.dataSourceRequest.pageSize = originalRequest;
      }

      this.isLoadingResults = false;
      return result;
    } catch (err) {
      this.messageService.displayMessage("Failed loading clients");

      if (all) {
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
    value = value || "";
    value = value.trim().toLowerCase();

    if (value !== "") {
      this.dataSourceRequest.filter = new DataSourceRequestFilter(
        "",
        DataSourceOperator.Contains,
        value == "" ? null : value,
        DataSourceLogic.Or
      );
      this.dataSourceRequest.filter.filters = new Array<
        DataSourceRequestFilter
      >();
      this.dataSourceRequest.filter.filters.push(
        new DataSourceRequestFilter(
          "Email.ToLower()",
          DataSourceOperator.Contains,
          value == "" ? null : value,
          DataSourceLogic.Or
        )
      );
      this.dataSourceRequest.filter.filters.push(
        new DataSourceRequestFilter(
          "UserName.ToLower()",
          DataSourceOperator.Contains,
          value == "" ? null : value,
          DataSourceLogic.Or
        )
      );
    } else {
      this.dataSourceRequest.filter = new DataSourceRequestFilter(
        null,
        DataSourceOperator.None,
        null,
        DataSourceLogic.None
      );
    }

    this.dataSource = await this.loadData(false);
  }

  public clearFilters() {
    this.dataSourceRequest.filter = new DataSourceRequestFilter(
      null,
      DataSourceOperator.None,
      null,
      DataSourceLogic.None
    );
    this.searchFilter = "";
  }

  async pagingChanged(pageEvent: PageEvent) {
    this.dataSourceRequest.currentPage = pageEvent.pageIndex;
    this.dataSourceRequest.pageSize = pageEvent.pageSize;
    this.dataSource = await this.loadData(false);
  }

  async sortData(sortChange: Sort) {
    this.dataSourceRequest.sort = new Array<DatasourceSort>();

    if (sortChange.direction !== "") {
      this.dataSourceRequest.sort.push(
        new DatasourceSort(this.sort.active, DataSourceSortDirection.None)
      );
      this.dataSourceRequest.sort[0].updateDirectionByMatSort(
        sortChange.direction
      );
    }

    this.dataSource = await this.loadData(false);
  }

  sortDirection() {
    if (this.dataSourceRequest.sort.length > 0) {
      return this.dataSourceRequest.sort[0].dir;
    }

    return "";
  }

  sortActive() {
    if (this.dataSourceRequest.sort.length > 0) {
      return this.dataSourceRequest.sort[0].field;
    }

    return "";
  }

  async export() {
    const dataExport = await this.loadData(true);
    const workSheet = XLSX.utils.json_to_sheet(dataExport.data, {
      header: ["dataprop1", "dataprop2"]
    });
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "SheetName");
    XLSX.writeFile(workBook, "Clients.xlsx");
  }
}
