import { DataSourceSortDirection } from './dataSource-sort-direction';
import { SortDirection } from '@angular/material/sort';

export class DatasourceSort {
    constructor(field: string, direction: DataSourceSortDirection) {
        this.field = field;
        this.updateDirection(direction);
    }

    field: string;
    dir: string;

    private directionEnum: DataSourceSortDirection;
    private matSortDirection: SortDirection;

    public updateDirection(directionEnum: DataSourceSortDirection) : void
    {
        this.directionEnum = directionEnum;
        switch (directionEnum) {
            case DataSourceSortDirection.Asc:
                this.dir = 'asc';
                this.matSortDirection = 'asc';
                break;
            case DataSourceSortDirection.Desc:
                this.dir = 'desc';
                this.matSortDirection = 'desc';
                break;
            case DataSourceSortDirection.None:
                this.dir = ''; 
                this.matSortDirection = ''
                break;
            default:
                break;
        }
    }

    public updateDirectionByMatSort(direction: SortDirection) : void
    {
        this.matSortDirection = direction;
        switch (direction) {
            case 'asc':
                this.dir = 'asc';
                this.directionEnum = DataSourceSortDirection.Asc; 
                break;
            case 'desc':
                this.dir = 'desc';
                this.directionEnum = DataSourceSortDirection.Desc; 
                break;
            case '':
                this.dir = ''; 
                this.directionEnum = DataSourceSortDirection.None; 
                break;
            default:
                break;
        }
    }

    public ReturnMastsortDirection()
    {
        return this.matSortDirection;
    }
}
