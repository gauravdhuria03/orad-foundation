import { Routes } from '@angular/router';
import { UsersListComponent } from '../../admin/users/list/list.component';
import { EditUserComponent } from '../../admin/users/edit/edit.component';
import { SponsorshipComponent } from '../../admin/sponsorship/sponsorship.component';
import { InsiderComponent } from '../../admin/insider/insider.component';
import { ContactsComponent } from '../../admin/contacts/contacts.component';
import { EventsListComponent } from '../../admin/events/list/list.component';
import { EditEventComponent } from '../../admin/events/edit/edit.component';


import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { TableListComponent } from '../../admin/table-list/table-list.component';
import { TypographyComponent } from '../../admin/typography/typography.component';
import { IconsComponent } from '../../admin/icons/icons.component';
import { MapsComponent } from '../../admin/maps/maps.component';
import { NotificationsComponent } from '../../admin/notifications/notifications.component';
import { UpgradeComponent } from '../../admin/upgrade/upgrade.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'admin/dashboard',component: DashboardComponent },
    { path: 'admin/users', component: UsersListComponent },
    { path: 'admin/users/edit/:id', component: EditUserComponent },
    { path: 'admin/sponsorship', component: SponsorshipComponent },
    { path: 'admin/insider', component: InsiderComponent },
    { path: 'admin/contacts', component: ContactsComponent },
    { path: 'admin/events', component: EventsListComponent },
    { path: 'admin/events/edit/:id', component: EditEventComponent },
    
    { path: 'admin/user-profile',   component: UserProfileComponent },
    { path: 'admin/table-list',     component: TableListComponent },
    { path: 'admin/typography',     component: TypographyComponent },
    { path: 'admin/icons',          component: IconsComponent },
    { path: 'admin/maps',           component: MapsComponent },
    { path: 'admin/notifications',  component: NotificationsComponent },
    { path: 'admin/upgrade',        component: UpgradeComponent },
];
