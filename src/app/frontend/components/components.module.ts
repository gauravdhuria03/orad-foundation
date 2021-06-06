import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FootersComponent } from './footer/footer.component';
import { HeadersComponent } from './header/header.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FootersComponent,    
    HeadersComponent,
  ],
  exports: [
    FootersComponent,
    HeadersComponent,
  ]
})
export class ComponentsFrontendModule { }
