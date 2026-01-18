import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Exercise3 } from './exercise3/exercise3';
import { Mybinding } from './mybinding/mybinding';
import { Ptb1 } from './ptb1/ptb1';
import { CourseGpaComponent } from './coursegpa/coursegpa';
import { Ptb2 } from './ptb2/ptb2';
import { Learndirective } from './learndirective/learndirective';
import { Exercise10 } from './exercise10/exercise10';
import { Listproduct1 } from './listproduct1/listproduct1';
import { Listproduct2 } from './listproduct2/listproduct2';
import { Customer } from './customer/customer';
import { Listproduct3 } from './listproduct3/listproduct3';
import { Exercise18Component, Exercise18 } from './exercise18/exercise18';
import { Pagenotfound } from './pagenotfound/pagenotfound';
import { Listcustomer } from './listcustomer/listcustomer';
import { Customerdetail } from './customerdetail/customerdetail';
import { Listcustomerservicer } from './myservices/listcustomerservicer/listcustomerservicer';
import { ListCustomerHttpService } from './myservices/list-customer-http-service/list-customer-http-service';
import { Exercise13 } from './exercise13/exercise13';
import { Exercise14 } from './exercise14/exercise14';
import { Exercise19 } from './exercise19/exercise19';

@NgModule({
  declarations: [
    App,
    About,
    Contact,
    Exercise3,
    Ptb1,
    CourseGpaComponent,
    Ptb2,
    Learndirective,
    Exercise10,
    Listproduct1,
    Listproduct2,
    Customer,
    Listproduct3,
    Exercise18Component,
    Pagenotfound,
    Listcustomer,
    Customerdetail,
    Listcustomerservicer,
    ListCustomerHttpService,
    Exercise13,
    Exercise14,
    Exercise19,
    Exercise18
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    Mybinding,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
