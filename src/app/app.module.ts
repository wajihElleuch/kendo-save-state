import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KendoGridModule} from './kendo-grid/kendo-grid.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

const route: Routes = [
  {path: '', redirectTo: 'kendo', pathMatch: 'prefix'},
  {path: 'kendo', loadChildren: () => import('./kendo-grid/kendo-grid.module').then(m => m.KendoGridModule)},
  {path: 'hello', loadChildren: () => import('./hello-word/hello-word.module').then(m => m.HelloWordModule)}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KendoGridModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
