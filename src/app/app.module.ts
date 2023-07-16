import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DataComponent } from './data/data.component';
import { AsynchronousComponent } from './asynchronous/asynchronous.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    AsynchronousComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
