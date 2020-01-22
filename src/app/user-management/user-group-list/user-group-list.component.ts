import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MessagingService} from 'src/app/services/messaging.service';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrls: ['./user-group-list.component.scss']
})
export class UserGroupListComponent implements OnInit {
  public expanded = false;
  isDesktop = false;
  watcher: Subscription;
  activeMediaQuery = '';
  filteredText = '';
  xsClass = 'tool-bar-small';
  userService: UserService;
  searchFilter = '';
  dataSource: MatTableDataSource<string>;
  selection = new SelectionModel<string>(true, []);
  displayedColumns: string[] = [];
  isLoadingResults = true;
  regExpr: any;
  refreshTimer: any;
  refreshInterval = 60 * 5; // 5 minutes
  actionIcon = 'edit';
  pageTitle = '';
  messageService: MessagingService;
  userId : string;
//   userId: '4d1a1542-bc8d-4c6e-a436-a9bc88502f03';

  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort, { static: false })set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, { static: false })set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
      this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  constructor(private route: ActivatedRoute, private router: Router, mediaObserver: MediaObserver, userService: UserService, messageService: MessagingService) {
      this.userService = userService;
      this.messageService = messageService;

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
      this.userId = this.route.snapshot.paramMap.get('id');
      this.InitializeGridColumns();
      await this.loadData();
      this.startAutoRefresh();
  }

  public toggleDisplayFilter(): void {
      this.expanded = !this.expanded;
  }

  InitializeGridColumns() {
      this.displayedColumns.push('select');
      this.displayedColumns.push('role');
      this.displayedColumns.push('remove');
  }

  async loadData() {
      this.isLoadingResults = true;

      try {
          this.route.data.subscribe((data: {
              roles: string[]
          }) => {
              if (data.roles) {
                  const mappedData = [...data.roles].map((row: string) => {
                      return row;
                  });

                  this.dataSource = new MatTableDataSource(mappedData);
              }

              this.isLoadingResults = false;
          });
      } catch (err) {
          this.messageService.displayMessage('Failed loading user roles');
          this.isLoadingResults = false;
      }
  }

  sortData(sortChange: Sort) {
      this.userService.sort.id = sortChange.active;
      if (sortChange.direction !== '') {
          this.userService.sort.start = sortChange.direction;
      }
  }

  sortActive() {
      return this.userService.sort.id;
  }


  sortDirection() {
      return this.userService.sort.start;
  }

  startAutoRefresh() {
      this.refreshTimer = setInterval(() => {
          this.refresh();
      }, this.refreshInterval * 1000);
  }

  pauseAutoRefresh() {
      clearInterval(this.refreshTimer);
  }

  refresh() {
      this.loadData();
  }
  regExprFilter() {
      return(data: any, filter: string) => {
          try {
              let searchStr = data;
              if (typeof data === 'object') {
                  searchStr = data.type + data.value;
              }
              searchStr = searchStr.toLowerCase();
              const searchRegex = new RegExp(this.userService.filter.search);
              return searchRegex.test(searchStr);
          } catch (e) {
              return false;
          }
      };
  }

  onSearch(value: string): void {
      value = value || '';
      value = value.trim().toLowerCase();
      this.userService.filter.search = value;
      this.applyFilter();
  }

  applyFilter(): void {
      const filterValue = this.userService.filter.search;
      this.dataSource.filter = filterValue;
  }

  // export(): void {
  //     const data = this.exportData(this.dataSource.filteredData);
  //     this.excelService.exportAsExcelFile(data, 'Test');
  // }

  isAllSelected(): boolean {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.filteredData.length;
      return numSelected === numRows;
  }

  masterToggle(): void {
      this.isAllSelected() ? this.selection.clear() : this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  goBack() {
        this.router.navigate(['/users']);
        return true;
    }
  
  async removeRoles() {
        try {
            this.isLoadingResults = true;
            await this.userService.removeRolesFromUser(this.userId, this.selection.selected).toPromise();
            this.messageService.displayMessage('Removed Roles');
            this.isLoadingResults = false;
            this.goBack();
        } catch (error) {
            this.messageService.displayMessage('Failed removing roles');
            this.isLoadingResults = false;
        }
    }

    async removeRole(role: string) {
        try {
            this.isLoadingResults = true;
            const roles = [];
            roles.push(role);
            await this.userService.removeRolesFromUser(this.userId, roles).toPromise();
            this.messageService.displayMessage('Removed role: ' + role);
            this.isLoadingResults = false;
            this.goBack();
        } catch (error) {
            this.messageService.displayMessage('Failed removing role: ' + role);
            this.isLoadingResults = false;
        }
    }
}
