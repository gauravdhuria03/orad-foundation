import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as Moment from 'moment';
import { SponsorshipService, AlertService } from '../../_services';

@Component({
  selector: 'app-sponsorship',
  templateUrl: './sponsorship.component.html',
  styleUrls: ['./sponsorship.component.css']
})
export class SponsorshipComponent implements OnInit {
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
      private sponsorshipService: SponsorshipService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.form = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyContactName: ['', Validators.required],
      companyPhoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      companyWebsite: ['', Validators.required],
      levelOfSponsership: ['', Validators.required],
      companyAddress1: ['', Validators.required],
      companyAddress2: ['', Validators.required],      
      comment: ['', Validators.required]
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
      companyName:this.f.companyName.value,
      companyContactName:this.f.companyContactName.value, 
      companyPhoneNumber:this.f.companyPhoneNumber.value,
      email:this.f.email.value,
      companyWebsite:this.f.companyWebsite.value,
      levelOfSponsership:this.f.levelOfSponsership.value,
      companyAddress1:this.f.companyAddress1.value,
      companyAddress2:this.f.companyAddress2.value ,  
      comment:this.f.comment.value   
    }
    console.log("ddddd====");
    this.sponsorshipService.add(params)
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
