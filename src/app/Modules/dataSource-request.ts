import { DatasourceSort } from './datasource-sort.';
import { DataSourceRequestFilter } from './dataSource-request-filter';
import { DataSourceOperator } from './dataSource-operator';
import { DataSourceLogic } from './dataSource-logic';

export class DataSourceRequest {

    constructor() {
        this.sort = new Array<DatasourceSort>();
        this.pageSize = 10;
        this.currentPage = 0;
        this.filter = new DataSourceRequestFilter(null, DataSourceOperator.None, null, DataSourceLogic.None);
    }

    pageSize: number;
    currentPage: number;
    sort: DatasourceSort[];
    filter: DataSourceRequestFilter;
}
