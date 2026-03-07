import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex58ClientFashionlist } from './ex58-client-fashionlist/ex58-client-fashionlist';
import { Ex58ClientFashiondetail } from './ex58-client-fashiondetail/ex58-client-fashiondetail';

const routes: Routes = [
  { path: '', component: Ex58ClientFashionlist },
  { path: 'fashions/:id', component: Ex58ClientFashiondetail },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
