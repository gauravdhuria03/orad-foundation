import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as Moment from 'moment';
import { EventsService, AlertService } from '../../_services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  loading = false;
  submitted = false;
  baseUrl=environment.baseUrl;
  data = [];
  eventsCatData = [];
  id: any;
  success=false;
  error=false;
  noRecordFound=false;
  successMessage: any;
  errorMessage: any;      
  form: FormGroup;
  moment= Moment;
  minStartDate = new Date();
    minEndDate:Date;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
      private router: Router,
      private eventsService: EventsService,
      private alertService: AlertService
  ) { }

  ngOnInit() { 
    this.getEventsCategories();

  }

  getEventDetail(id:any){
    this.router.navigate(['event-details/'+id]);                  

  }

  getEventsCategories() {   
    this.loading = true;
    
    this.eventsService.getEventsCategories()
        .pipe(first())
        .subscribe(
          (res: any) => {
              this.loading = false;
              console.log("res.data sfdsfdsdsfdsf===",res);
              if (res && res.code == 200) {
                
                this.eventsCatData = res.data;
                if(this.eventsCatData.length >=0 ){
                  this.noRecordFound = true;
                }
              }
              else {
                this.errorMessage=res.message;                  

              }
            
            },
            error => {
              this.error = true;
              this.errorMessage=error.message;                  
              this.loading = false;
            });
  }

  getEventsList(id:any) {   
    this.loading = true;
    let params={
      category_id:id    
    }
    console.log("ddddd====");
    this.eventsService.getEventsList(params)
        .pipe(first())
        .subscribe(
          (res: any) => {
              this.loading = false;
              console.log("res.data===",res);
              if (res && res.code == 200) {
                
                this.data = res.data;
                if(this.data.length >=0 ){
                  this.noRecordFound = true;
                }
              }
              else {
                this.errorMessage=res.message;                  

              }
            
            },
            error => {
              this.error = true;
              this.errorMessage=error.message;                  
              this.loading = false;
            });
  }

}
