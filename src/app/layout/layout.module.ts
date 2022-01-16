import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeOneComponent } from './components/type-one/type-one.component';
import { TypeTwoComponent } from './components/type-two/type-two.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    LayoutComponent,
    TypeOneComponent,
    TypeTwoComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
  ]
})
export class LayoutModule { }
