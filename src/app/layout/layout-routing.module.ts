import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeOneComponent } from './components/type-one/type-one.component';
import { TypeTwoComponent } from './components/type-two/type-two.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'one', component: TypeOneComponent },
    { path: 'two', component: TypeTwoComponent },
    { path: '', redirectTo: '/one', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
