import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../../../_services';
@Component({
  selector: 'edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditUserComponent implements OnInit {
  loading = false;
  submitted = false;
  usersData = [];
  id: any;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required]
    });

    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    
    console.log('location.origin===',location.origin);
    this.getUserDetail();
  }
  get f() { return this.form.controls; }
  getUserDetail(){
    this.accountService.getById(this.id)
    .pipe(first())
    .subscribe(
        data => {                  
            if(data['code']!=200){
              this.alertService.error(data['message']);
              this.loading = false;
            }else{
             this.usersData=data['data'];  
            //  const { firstName:"ddd" };    
             this.form.patchValue({
              userName:this.usersData['userName'],
              email:this.usersData['email'],
              mobileNumber:this.usersData['mobileNumber'],
              firstName:this.usersData['firstName'],
              lastName:this.usersData['lastName'],
              street:this.usersData['street'],
              city:this.usersData['city'],
              state:this.usersData['state'],
              country:this.usersData['country'],
              postalCode:this.usersData['postalCode']
            });        
            }
            console.log("userDetails==",this.usersData);
        },
        error => {
            this.alertService.error(error.message);
            this.loading = false;
        });    

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
