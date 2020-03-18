import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KendoGridComponent} from './kendo-grid.component';
import {GridModule} from '@progress/kendo-angular-grid';
import {RouterModule, Routes} from '@angular/router';


const route: Routes = [
  {path: '', component: KendoGridComponent}
];

@NgModule({
  declarations: [KendoGridComponent],
  exports: [
    KendoGridComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    RouterModule.forChild(route)
  ]
})
export class KendoGridModule {
}
