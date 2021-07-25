import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontendLayoutRoutes } from './frontend-layout.routing';
import { HomeComponent } from '../../frontend/home/home.component';
import { LoginComponent } from '../../frontend/login/login.component';
import { RegisterComponent } from '../../frontend/register/register.component';

import { ContactsComponent } from '../../frontend/contacts/contacts.component';
import { InsiderComponent } from '../../frontend/insider/insider.component';
import { SponsorshipComponent } from '../../frontend/sponsorship/sponsorship.component';
import { EventsComponent } from '../../frontend/events/events.component';
import { EventDetailsComponent } from '../../frontend/event-details/event-details.component';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FrontendLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
    
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,   
    ContactsComponent, 
    InsiderComponent,
    SponsorshipComponent,
    EventsComponent,
    EventDetailsComponent,
  ]
})

export class FrontendLayoutModule {}
