import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AccountService,SponsorshipService,ContactsService,InsiderService} from '../../_services';
import { genralConfig } from '../../_components/constant/genral-config.constant';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loading = false;  
  
  usersCount: any = '';
  contactsCount: any ='' ;
  eventsCount: any = '';
  insiderCount: any = '';
  sponsorshipCount:any = '';

  
  constructor(
    private accountService:AccountService,
    private sponsorshipService:SponsorshipService,
    private contactsService:ContactsService,
    private insiderService:InsiderService,
    private toastr: ToastrService
  ) { }
  

      seq2 = 0;
  
  ngOnInit() {
    this.getAll();

  }
  getAll(){
  
    this.accountService.getDashboardCounts()
    .pipe(first())
    .subscribe((res: any) => {                
            console.log("res==",res);
            if (res && res.code == genralConfig.statusCode.ok) {
             
              this.usersCount = res.data.usersCount;
              this.insiderCount = res.data.insiderCount;
              this.sponsorshipCount = res.data.sponsorshipCount;
              this.eventsCount = res.data.eventsCount;
              this.contactsCount = res.data.contactsCount;           
              
            }else {
              this.toastr.error(res.message);
            }
        },
        error => {
            this.toastr.error(error.message);
            this.loading = false;
        });
  }

}
