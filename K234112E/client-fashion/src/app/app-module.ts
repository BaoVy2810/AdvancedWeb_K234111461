import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ex58ClientFashionlist } from './ex58-client-fashionlist/ex58-client-fashionlist';
import { Ex58ClientFashiondetail } from './ex58-client-fashiondetail/ex58-client-fashiondetail';

@NgModule({
  declarations: [
    App,
    Ex58ClientFashionlist,
    Ex58ClientFashiondetail
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
