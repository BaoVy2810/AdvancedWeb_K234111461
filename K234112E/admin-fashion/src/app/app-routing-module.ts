import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex58AdminFashiondetail } from './ex58-admin-fashiondetail/ex58-admin-fashiondetail';
import { Ex58AdminFashionlist } from './ex58-admin-fashionlist/ex58-admin-fashionlist';

const routes: Routes = [
  { path:'', component: Ex58AdminFashionlist},
  { path: 'fashion/:id', component: Ex58AdminFashiondetail},
  { path: 'fashion/edit/:id', component: Ex58AdminFashiondetail },
  { path: 'fashion/new', component: Ex58AdminFashiondetail },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
