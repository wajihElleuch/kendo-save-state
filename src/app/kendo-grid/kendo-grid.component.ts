import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {sampleCustomers} from '../fake-data/customer';
import {GridSettings} from '../interfaces/grid-settings';
import {sampleProducts} from '../fake-data/products';
import {StatePersistingService} from '../services/state-persisting.service';
import {process, State} from '@progress/kendo-data-query';
import {GridComponent} from '@progress/kendo-angular-grid';
import {ColumnSettings} from '../interfaces/column-settings';

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styleUrls: ['./kendo-grid.component.scss']
})
export class KendoGridComponent implements OnDestroy, OnInit {
  @ViewChild('grid') grid: GridComponent;
  @Input('isGroupable') isGroupable = true;
  @Input('isSortable') isSortable = true;
  @Input('isPageable') isPageable = true;
  @Input('isFilterable') isFilterable = true;
  @Input('isResizable') isResizable = true;
  @Input('isReorderable') isReorderable = true;
  @Input('haveColumnMenu') haveColumnMenu = true;

  // public gridData: any[] = sampleCustomers;
  public gridSettings: GridSettings = {
    state: {
      skip: 0,
      take: 5,

      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: []
      }
    },
    gridData: process(sampleProducts, {
      skip: 0,
      take: 5,
      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: []
      }
    }),
    columnsConfig: [{
      field: 'ProductID',
      title: 'ID',
      filterable: false,
      _width: 40
    }, {
      field: 'ProductName',
      title: 'Product Name',
      filterable: true,
      _width: 300
    }, {
      field: 'FirstOrderedOn',
      title: 'First Ordered On',
      filter: 'date',
      format: '{0:d}',
      _width: 240,
      filterable: true
    }, {
      field: 'UnitPrice',
      title: 'Unit Price',
      filter: 'numeric',
      format: '{0:c}',
      _width: 180,
      filterable: true
    }, {
      field: 'Discontinued',
      filter: 'boolean',
      _width: 120,
      filterable: true
    }]
  };

  constructor(public persistingService: StatePersistingService) {
    // const gridSettings: GridSettings = this.persistingService.get('gridSettings');

  }

  ngOnInit(): void {
    console.log('eee');

    const value = this.persistingService.previewsState;
    console.log(value);
    const gridSettings: GridSettings = value;
    if (gridSettings !== null) {
      this.gridSettings = this.mapGridSettings(gridSettings);
    }

  }

  public get savedStateExists(): boolean {
    return !!this.persistingService.get('gridSettings');
  }


  public dataStateChange(state: State): void {
    console.log(state);
    // this.groups = state.group;
    this.gridSettings.state = state;
    this.gridSettings.gridData = process(sampleProducts, state);
  }

  public saveGridSettings(grid: GridComponent): void {
    const columns = grid.columns;

    const gridConfig = {
      state: this.gridSettings.state,
      columnsConfig: columns.toArray().map(item => {
        return Object.keys(item)
          .filter(propName => !propName.toLowerCase()
            .includes('template'))
          .reduce((acc, curr) => ({...acc, ...{[curr]: item[curr]}}), <ColumnSettings> {});
      })
    };

    this.persistingService.set('gridSettings', gridConfig);
  }

  public mapGridSettings(gridSettings: GridSettings): GridSettings {
    const state = gridSettings.state;
    this.mapDateFilter(state.filter);

    return {
      state,
      columnsConfig: gridSettings.columnsConfig.sort((a, b) => a.orderIndex - b.orderIndex),
      gridData: process(sampleProducts, state)
    };
  }

  private mapDateFilter = (descriptor: any) => {
    const filters = descriptor.filters || [];

    filters.forEach(filter => {
      if (filter.filters) {
        this.mapDateFilter(filter);
      } else if (filter.field === 'FirstOrderedOn' && filter.value) {
        filter.value = new Date(filter.value);
      }
    });
  };


  ngOnDestroy(): void {
    const columns = this.grid.columns;

    const gridConfig = {
      state: this.gridSettings.state,
      columnsConfig: columns.toArray().map(item => {
        return Object.keys(item)
          .filter(propName => !propName.toLowerCase()
            .includes('template'))
          .reduce((acc, curr) => ({...acc, ...{[curr]: item[curr]}}), <ColumnSettings> {});
      })
    };
    // console.log(gridConfig);
    this.persistingService.addState(gridConfig);
  }
}


