import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as Moment from 'moment';
import { ContactsService, AlertService } from '../../_services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  loading = false;
  submitted = false;
  data = [];
  id: any;
  success=false;
  error=false;
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
      private contactsService: ContactsService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      cellPhone: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.loading = false;
  }
  get f() { return this.form.controls; }

 
  onSubmit() {

    

    this.submitted = true;
    this.success= false;
    this.error= false;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    let params={
      userName:this.f.userName.value,
      cellPhone:this.f.cellPhone.value, 
      email:this.f.email.value,
      subject:this.f.subject.value,
      message:this.f.message.value   
    }
    console.log("ddddd====");
    this.contactsService.add(params)
        .pipe(first())
        .subscribe(
            data => {
              this.loading = false;
            
              console.log("asssss");      
                if(data['code']!=200){
                  this.error = true;
                  this.errorMessage=data['message'];                    
                }else{
                  this.form.reset(); // or form.reset();                    
                  this.success = true;
                  this.successMessage=data['message'];                                              
                }
            },
            error => {
              this.error = true;
              this.errorMessage=error.message;                  
              this.loading = false;
            });
  }

}
