import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Listproduct1 } from './listproduct1/listproduct1';
import { Listproduct2 } from './listproduct2/listproduct2';
import { Listproduct3 } from './listproduct3/listproduct3';
import { Pagenotfound } from './pagenotfound/pagenotfound';
import { Listcustomer } from './listcustomer/listcustomer';
import { Customerdetail } from './customerdetail/customerdetail';
import { Listcustomerservicer } from './myservices/listcustomerservicer/listcustomerservicer';
import { ListCustomerHttpService } from './myservices/list-customer-http-service/list-customer-http-service';

const routes: Routes = [
  {path:"gioithieu",component:About},
  {path:"sanpham1",component:Listproduct1},
  {path:"sanpham2",component:Listproduct2},
  {path:"sanpham3",component:Listproduct3},
  {path:"list-customer",component:Listcustomer},
  {path:"list-customer/:id",component:Customerdetail},
  {path:"list-customer-service",component:Listcustomerservicer},
  {path:"list-customer-service/:id",component:Customerdetail},
  {path:"list-customer-http-service",component:ListCustomerHttpService},
  {path:"list-customer-http-service/:id",component:Customerdetail},


  {path:"**",component:Pagenotfound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
