import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as Moment from 'moment';

import { EventsCategoriesService,EventsService,AccountService, AlertService } from '../../../_services';
@Component({
  selector: 'edit-event',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditEventComponent implements OnInit {
  loading = false;
  submitted = false;
  data = [];
  id: any;
  form: FormGroup;
  moment= Moment;
  minStartDate = new Date();
    minEndDate:Date;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private eventsService:EventsService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      overview: ['', Validators.required],
      zoomLink: ['', Validators.required],
      zoomId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    
    console.log('location.origin===',location.origin);
    this.getEventDetail();
  }
  get f() { return this.form.controls; }
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
            //  const { firstName:"ddd" };    
             this.form.patchValue({
              title:this.data['title'],
              overview:this.data['overview'],
              zoomLink:this.data['zoomLink'],
              zoomId:this.data['zoomId'],
             startDate: this.data['startDate'],
             endDate: this.data['endDate'],             
            });        
            }
            console.log("eventData==",this.data);
        },
        error => {
            this.alertService.error(error.message);
            this.loading = false;
        });    

  }
  onValueChange(value: Date){
    this.form.get('endDate').patchValue('');
    this.minEndDate=value;
}

logoupload(e){
  
  
}

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    let params={
      userId:this.id,
      firstName:this.f.firstName.value, lastName:this.f.lastName.value,
      street:this.f.street.value,
      city:this.f.city.value,state:this.f.state.value,country:this.f.country.value,
      postalCode:this.f.postalCode.value   

    }
    this.accountService.update(params)
        .pipe(first())
        .subscribe(
            data => {                  
                if(data['code']!=200){
                  this.alertService.error(data['message']);
                  this.loading = false;
                }else{
                  this.alertService.error(data['message']);  
                  this.router.navigate(['/admin/users']);                  
                }
            },
            error => {
                this.alertService.error(error.message);
                this.loading = false;
            });
  }

}
