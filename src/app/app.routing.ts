import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontendLayoutComponent } from './layouts/frontend-layout/frontend-layout.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes =[
  {
    path: 'admin',
    redirectTo: 'admin/login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
   {
    path: '',
    component: FrontendLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/frontend-layout/frontend-layout.module#FrontendLayoutModule'
    }]
    
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }],
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: 'admin/login',      component: LoginComponent },
  { path: 'admin/logout',      component: LoginComponent },
  

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
