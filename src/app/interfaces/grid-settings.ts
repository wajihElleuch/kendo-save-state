import {ColumnSettings} from './column-settings';
import {DataResult, State} from '@progress/kendo-data-query';

export interface GridSettings {
  columnsConfig: ColumnSettings[];
  state: State;
  gridData?: DataResult;
}
