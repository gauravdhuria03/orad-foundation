import { Component, OnInit } from '@angular/core';
import { AccountService, AlertService } from '../../../_services';
import { first } from 'rxjs/operators';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/users', title: 'Users',  icon: 'person', class: '' },
    { path: '/admin/sponsorship', title: 'Sponsorship',  icon: 'inventory', class: '' },
    { path: '/admin/insider', title: 'Insider',  icon: 'light', class: '' },
    { path: '/admin/contacts', title: 'Contacts',  icon: 'contact_page', class: '' },
    { path: '/admin/events', title: 'Events',  icon: 'event', class: '' },
    
    { path: '/admin/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/admin/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/admin/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/admin/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/admin/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  loading = false;  
  
  constructor(private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(){
    this.loading = true;
    this.accountService.adminlogout();
       
}

  
}
