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
import { ServiceProductImageEventDetail } from './exercise13/service-product-image-event-detail/service-product-image-event-detail';
import { ServiceProductImageEvent } from './exercise13/service-product-image-event/service-product-image-event';
import { ServiceProductComponent } from './exercise19/service-product-component/service-product-component';
import { ProductComponent } from './exercise19/product-component/product-component';
import { ListProductComponent } from './exercise19/list-product-component/list-product-component';
import { Form } from './form/form';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { ReactiveForms } from './reactive-forms/reactive-forms';
import { Books } from './books/books';

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
  {path:'service-product-image-event',component:ServiceProductImageEvent},
  {path:'service-product-image-event/:id',component:ServiceProductImageEventDetail},
  {path:'product',component:ProductComponent},
  {path:'list-product',component:ListProductComponent},
  {path:'service-product',component:ServiceProductComponent},
  {path:"registerform",component:Form},
  {path:"reactiveform",component:ReactiveForms},
  {path:"ex26",component:FakeProductComponent},
  {path:"ex39",component:Books},


  {path:"**",component:Pagenotfound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent=[
  ProductComponent,
  ListProductComponent,
  ServiceProductComponent,
]