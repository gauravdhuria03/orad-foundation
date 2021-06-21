import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../../../_services';
@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UsersListComponent implements OnInit {
  loading = false;
  usersData = [];
  constructor(
    private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
      
    this.accountService.getAll()
        .pipe(first())
        .subscribe(
            data => {                  
                if(data['code']!=200){
                  this.alertService.error(data['message']);
                  this.loading = false;
                }else{
                 this.usersData=data['data']; 
                }
            },
            error => {
                this.alertService.error(error.message);
                this.loading = false;
            });
  }
  edit(id:any){
    this.router.navigate(['admin/users/edit/'+id]);                  

  }

}
