import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { InsiderService, AlertService } from '../../_services';
import { genralConfig } from '../../_components/constant/genral-config.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insider',
  templateUrl: './insider.component.html',
  styleUrls: ['./insider.component.css']
})
export class InsiderComponent implements OnInit {


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
      private insiderService: InsiderService,
      private alertService: AlertService,
      private toastr: ToastrService
      
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
    this.insiderService.getInsiderList(speclObject)
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

  
  
    delete(id:any) {      
      var r = confirm("Are you sure you wants to delete");
      if (r == true) {
        let params={
          insiderId:id,
          isDeleted:true
        }
        this.insiderService.delete(params)
            .pipe(first())
            .subscribe(
                data => {                  
                    if(data['code']!=200){
                      this.alertService.error(data['message']);
                      this.loading = false;
                    } else {
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

    paginate(event) {
      this.page = event.pageIndex + 1;
      this.count = event.pageSize;
      this.getAll();
    }


}
