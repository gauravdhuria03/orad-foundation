import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as Moment from 'moment';
import { EventsService,AlertService } from '../../_services';
import * as moment from "moment-timezone";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  loading = false;
  data :any;
  relatedEvents=[];
  baseUrl=environment.baseUrl;
  id: any;
  moment= moment;
  imagePath:any;
  imageSrc:any;
  noRecordFound=false;
  overview:any;

  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
      private router: Router,
      private eventsService: EventsService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEventDetail();
    this.getRelatedEvents();
  }
  getEventDet(id:any){  

    this.router.navigate(['events']); 
    this.router.navigate(['event-details/'+id]);                  

  }
  getEventDetail(){
    this.eventsService.getById(this.id)
    .pipe(first())
    .subscribe(
        res => {                  
            if(res['code']!=200){
              this.alertService.error(res['message']);
              this.loading = false;
            }else{
             this.data=res['data']; 
              this.imageSrc=environment.baseUrl+this.data['image'];
              this.overview=this.data['overview'];
            }
        },
        error => {
            this.alertService.error(error.message);
            this.loading = false;
        });    

  }

  getRelatedEvents() {   
    this.loading = true;
    let params={
      _id: { $ne: this.id } ,
      count:4 
    }
    console.log("ddddd====");
    this.eventsService.getEventsList(params)
        .pipe(first())
        .subscribe(
          (res: any) => {
              this.loading = false;
              console.log("res.data===",res);
              if (res && res.code == 200) {
                
                this.relatedEvents = res.data;
                if(this.relatedEvents.length >=0 ){
                  this.noRecordFound = true;
                }
              }
              
            
            },
            error => {
                              
              this.loading = false;
            });
  }

 
  
}
