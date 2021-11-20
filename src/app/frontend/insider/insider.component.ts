import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as Moment from 'moment';
import { InsiderService, AlertService } from '../../_services';


@Component({
  selector: 'app-insider',
  templateUrl: './insider.component.html',
  styleUrls: ['./insider.component.css']
})
export class InsiderComponent implements OnInit {

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
      private insiderService: InsiderService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      jobTitle: ['', Validators.required]
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
      firstName:this.f.firstName.value,
      lastName:this.f.lastName.value, 
      email:this.f.email.value,
      phoneNumber:this.f.phoneNumber.value,
      jobTitle:this.f.jobTitle.value   
    }
    console.log("ddddd====");
    this.insiderService.add(params)
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
                  this.form.clearValidators(); // or form.reset();                    
                
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
