import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
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
import { BookDetail } from './book-detail/book-detail';
import { FakeProductVersion2 } from './fake-product-component/fake-product-version-2/fake-product-version-2';
import { BookNewComponent } from './book-new-component/book-new-component';
import { Exercise50 } from './exercise50/exercise50';
import { Ex50BookinfoNewComponent } from './exercise50/ex50-bookinfo-new-component/ex50-bookinfo-new-component';
import { Ex50BookinfoDetailComponent } from './exercise50/ex50-bookinfo-detail-component/ex50-bookinfo-detail-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { Fashion } from './fashion/fashion';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { Login } from './login/login';
import { Register } from './register/register';
import { Exercise63 } from './exercise63/exercise63';
import { Cart } from './exercise63/cart/cart';
import { Exercise58 } from './exercise58/exercise58';
import { Ex58Form } from './exercise58/ex58-form/ex58-form';
import { Ex58Detail } from './exercise58/ex58-detail/ex58-detail';
import { Ex58Client } from './exercise58/ex58-client/ex58-client';

const routes: Routes = [
  { path: "login", component: Login },
  { path: "register", component: Register },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "home", component: Home },
  { path: "gioithieu", component: About },
  { path: "sanpham1", component: Listproduct1 },
  { path: "sanpham2", component: Listproduct2 },
  { path: "sanpham3", component: Listproduct3 },
  { path: "list-customer", component: Listcustomer },
  { path: "list-customer/:id", component: Customerdetail },
  { path: "list-customer-service", component: Listcustomerservicer },
  { path: "list-customer-service/:id", component: Customerdetail },
  { path: "list-customer-http-service", component: ListCustomerHttpService },
  { path: "list-customer-http-service/:id", component: Customerdetail },
  { path: "service-product-image-event", component: ServiceProductImageEvent },
  { path: "service-product-image-event/:id", component: ServiceProductImageEventDetail },
  { path: "product", component: ProductComponent },
  { path: "list-product", component: ListProductComponent },
  { path: "service-product", component: ServiceProductComponent },
  { path: "registerform", component: Form },
  { path: "reactiveform", component: ReactiveForms },
  { path: "ex26", component: FakeProductComponent },
  { path: "ex27", component: FakeProductVersion2 },
  { path: "ex39", component: Books },
  { path: "ex41/:id", component: BookDetail },
  { path: "ex41", component: BookDetail },
  { path: "ex43/:id", component: BookNewComponent },
  { path: "ex43", component: BookNewComponent },
  { path: "ex45", component: BookUpdateComponent },
  { path: "ex45/:id", component: BookUpdateComponent },
  { path: "ex47", component: BookDeleteComponent },
  { path: "ex50", component: Exercise50 },
  { path: "ex50/bookinfo", component: Ex50BookinfoNewComponent },
  { path: "ex50/bookinfo/:id", component: Ex50BookinfoNewComponent },
  { path: "ex50/detail", component: Ex50BookinfoDetailComponent },
  { path: "ex50/detail/:id", component: Ex50BookinfoDetailComponent },
  { path: "ex53", component: Fashion },
  { path: "ex54", component: FashionDetailComponent },
  { path: "ex54/:id", component: FashionDetailComponent },
  { path: "ex63", component: Exercise63 },
  { path: "cart", component: Cart },
  { path: "ex58", component: Exercise58 },
  { path: "ex58/new", component: Ex58Form },
  { path: "ex58/edit/:id", component: Ex58Form },
  { path: "ex58/detail/:id", component: Ex58Detail },
  { path: "ex58-client", component: Ex58Client },
  { path: "ex58-client/detail/:id", component: Ex58Detail },

  { path: "**", component: Pagenotfound }
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