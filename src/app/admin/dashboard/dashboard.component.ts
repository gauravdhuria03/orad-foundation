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
  totalEvents: any = '';
  totalInsider: any = '';

  
  constructor(
    private accountService:AccountService,
    private sponsorshipService:SponsorshipService,
    private contactsService:ContactsService,
    private insiderService:InsiderService,
    private toastr: ToastrService
  ) { }
  

      seq2 = 0;
  
  ngOnInit() {


  }
  getAll(){
  
    this.accountService.countAll()
    .pipe(first())
    .subscribe((res: any) => {                
            
            if (res && res.code == genralConfig.statusCode.ok) {
             
              this.usersCount = res.usersCount;       
              
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
