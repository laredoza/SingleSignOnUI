import { DataSourceOperator } from './dataSource-operator';
import { DataSourceLogic } from './dataSource-logic';

export class DataSourceRequestFilter {
    constructor(field: string, operator: DataSourceOperator, value: any, logic: DataSourceLogic) {
        this.field = field;
        switch (operator) {
            case DataSourceOperator.Eq:
                this.operator = "=";
                break;
            case DataSourceOperator.Neq:
                this.operator = "!=";
                break;
            case DataSourceOperator.Lt:
                this.operator = "<";
                break;
            case DataSourceOperator.Lte:
                this.operator = "<=";
                break;
            case DataSourceOperator.Gt:
                this.operator = ">";
                break;
            case DataSourceOperator.Gte:
                this.operator = ">=";
                break;
            case DataSourceOperator.StartsWith:
                this.operator = "StartsWith";
                break;
            case DataSourceOperator.Endswith:
                this.operator = "EndsWith";
                break;
            case DataSourceOperator.Contains:
                this.operator = "contains";
                break;
            case DataSourceOperator.DoesNotContain:
                this.operator = "Contains";
                break;
            case DataSourceOperator.None:
                this.operator = null; 
                break;
            default:
                this.operator = null;
                break;
        }

        this.value = value;
        switch (logic) {
            case DataSourceLogic.None:
                this.logic = null;
                break;
            case DataSourceLogic.And:
                this.logic = "and";
                break;
            case DataSourceLogic.Or:
                this.logic = "or";
                break;
            default:
                this.logic = null; 
                break;
        }
    }

    field: string;
    operator: string;
    value: any; 
    logic: string;
    filters: DataSourceRequestFilter[]; 
}
