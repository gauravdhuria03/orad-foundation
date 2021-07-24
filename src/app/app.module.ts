import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './_components/alert.component';
import {ToastrModule} from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ToastrService } from 'ngx-toastr';

import { ComponentsModule } from './admin/components/components.module';
import { ComponentsFrontendModule } from './frontend/components/components.module';

import { AppComponent } from './app.component';


import { LoginComponent } from './admin/login/login.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontendLayoutComponent } from './layouts/frontend-layout/frontend-layout.component';
import * as jQuery from 'jquery';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    ComponentsFrontendModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),

    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // }),
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FrontendLayoutComponent,
    LoginComponent,
    AlertComponent
    
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
