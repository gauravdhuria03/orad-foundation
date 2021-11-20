import { Routes } from '@angular/router';
import { UsersListComponent } from '../../admin/users/list/list.component';
import { EditUserComponent } from '../../admin/users/edit/edit.component';
import { SponsorshipComponent } from '../../admin/sponsorship/sponsorship.component';
import { InsiderComponent } from '../../admin/insider/insider.component';
import { ContactsComponent } from '../../admin/contacts/contacts.component';
import { EventsListComponent } from '../../admin/events/list/list.component';
import { EditEventComponent } from '../../admin/events/edit/edit.component';
import { AddEventComponent } from '../../admin/events/add/add.component';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';



export const AdminLayoutRoutes: Routes = [
    
    { path: 'admin/dashboard',component: DashboardComponent },
    { path: 'admin/users', component: UsersListComponent },
    { path: 'admin/users/edit/:id', component: EditUserComponent },
    { path: 'admin/sponsorship', component: SponsorshipComponent },
    { path: 'admin/insider', component: InsiderComponent },
    { path: 'admin/contacts', component: ContactsComponent },
    { path: 'admin/events', component: EventsListComponent },
    { path: 'admin/events/edit/:id', component: EditEventComponent },
    { path: 'admin/events/add', component: AddEventComponent }
    
];
