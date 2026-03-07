import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ex58AdminFashionlist } from './ex58-admin-fashionlist/ex58-admin-fashionlist';
import { Ex58AdminFashiondetail } from './ex58-admin-fashiondetail/ex58-admin-fashiondetail';

@NgModule({
  declarations: [
    App,
    Ex58AdminFashionlist,
    Ex58AdminFashiondetail
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
