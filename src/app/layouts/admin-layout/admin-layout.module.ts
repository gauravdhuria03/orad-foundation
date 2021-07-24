import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UsersListComponent } from '../../admin/users/list/list.component';
import { EditUserComponent } from '../../admin/users/edit/edit.component';
import { SponsorshipComponent } from '../../admin/sponsorship/sponsorship.component';
import { InsiderComponent } from '../../admin/insider/insider.component';
import { ContactsComponent } from '../../admin/contacts/contacts.component';
import { EventsListComponent } from '../../admin/events/list/list.component';
import { EditEventComponent } from '../../admin/events/edit/edit.component';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';


import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    BsDatepickerModule.forRoot()

  ],
  declarations: [
    UsersListComponent,
    EditUserComponent,
    DashboardComponent,
    UserProfileComponent,
  
    SponsorshipComponent,
    InsiderComponent,
    ContactsComponent,
    EventsListComponent,
    EditEventComponent
    
  ]
})

export class AdminLayoutModule {}
