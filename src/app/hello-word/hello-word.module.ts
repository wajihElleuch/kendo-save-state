import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelloWordComponent} from './hello-word.component';
import {RouterModule, Routes} from '@angular/router';

const route: Routes = [
  {path: '', component: HelloWordComponent}
];

@NgModule({
  declarations: [HelloWordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class HelloWordModule {
}
