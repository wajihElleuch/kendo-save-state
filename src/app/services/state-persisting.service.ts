import {Injectable} from '@angular/core';
import {GridSettings} from '../interfaces/grid-settings';
import {KendoGridComponent} from '../kendo-grid/kendo-grid.component';
import {BehaviorSubject, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatePersistingService {
  previewsState = null;
  gridState: Subject<any> = new Subject<any>();

  constructor() {
  }

  public get<T>(token: string): T {
    const settings = localStorage.getItem(token);
    return settings ? JSON.parse(settings) : settings;
  }

  public set<T>(token: string, gridConfig: GridSettings): void {
    console.log(gridConfig);
    localStorage.setItem(token, JSON.stringify(gridConfig));
  }

  addState(state) {
    this.gridState.next(state);
    this.previewsState = state;
  }

  getState() {
    return this.gridState.asObservable();
  }

}
