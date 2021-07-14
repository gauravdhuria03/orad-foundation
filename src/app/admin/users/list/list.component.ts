import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import { genralConfig } from '../../../_components/constant/genral-config.constant';
import { ToastrService } from 'ngx-toastr';
import { AccountService, AlertService } from '../../../_services';
@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UsersListComponent implements OnInit {
  loading = false;
  dataObject:Array<String> = [];

  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  sortValue : any ='';
  sortOrder : any =1;
  noRecordFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService,
      private  toastr:ToastrService
      
  ) { }

  ngOnInit() {
    this.loading = true;
      
    this.getAll();
  }

  getAll(){
    let speclObject = {
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      sortValue :  this.sortValue ? this.sortValue : '',
      sortOrder : this.sortOrder ? this.sortOrder :1
    };
    this.accountService.getAll(speclObject)
    .pipe(first())
    .subscribe((res: any) => {                
            
            if (res && res.code == genralConfig.statusCode.ok) {
              this.dataObject = res.data;
             
              this.totalCount = res.totalCount;       
              if(this.totalCount==0 || this.dataObject.length==0){
                this.noRecordFound = true;
              }
            }else {
              this.toastr.error(res.message);
            }
        },
        error => {
            this.toastr.error(error.message);
            this.loading = false;
        });
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.getAll();
  }
  
  edit(id:any){
    this.router.navigate(['admin/users/edit/'+id]);                  

  }
  
    delete(id:any) {
      
      var r = confirm("Are you sure you wants to delete");
      if (r == true) {
        let params={
          userId:id,
          isDeleted:true
        }
        this.accountService.delete(params)
            .pipe(first())
            .subscribe(
                data => {                  
                    if(data['code']!=200){
                      this.alertService.error(data['message']);
                      this.loading = false;
                    }else{
                      this.alertService.error(data['message']);  
                      this.getAll();
                    }
                },
                error => {
                    this.alertService.error(error.message);
                    this.loading = false;
                });
      } 
    }

    changeStatus(id:any,bool){
      var r = confirm("Are you sure you wants change status");
      if (r == true) {
   
        this.accountService.changestatus({userId : id , isActive : bool})
            .pipe(first())
            .subscribe(
                data => {                  
                    if(data['code']!=200){
                      this.alertService.error(data['message']);
                      this.loading = false;
                    }else{
                      this.alertService.error(data['message']);  
                      this.getAll();
                    }
                },
                error => {
                    this.alertService.error(error.message);
                    this.loading = false;
                });
      } 
    }
  
}
