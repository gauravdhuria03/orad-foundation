import { Routes } from '@angular/router';

import { HomeComponent } from '../../frontend/home/home.component';
import { LoginComponent } from '../../frontend/login/login.component';
import { RegisterComponent } from '../../frontend/register/register.component';

import { ContactsComponent } from '../../frontend/contacts/contacts.component';
import { InsiderComponent } from '../../frontend/insider/insider.component';
import { SponsorshipComponent } from '../../frontend/sponsorship/sponsorship.component';
import { EventsComponent } from '../../frontend/events/events.component';
import { EventDetailsComponent } from '../../frontend/event-details/event-details.component';


export const FrontendLayoutRoutes: Routes = [
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
    { path: '',      component: HomeComponent },
    { path: '/',      component: HomeComponent },
    { path: 'home',      component: HomeComponent },
    { path: 'login',   component: LoginComponent },
    { path: 'register',     component: RegisterComponent },
    { path: 'contact-us',     component: ContactsComponent },
    { path: 'become-an-insider',     component: InsiderComponent },
    { path: 'sponsorship',     component: SponsorshipComponent },
    { path: 'events',     component:EventsComponent},
    { path: 'event-details/:id',     component:EventDetailsComponent},
    
];
