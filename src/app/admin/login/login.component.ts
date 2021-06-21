import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as Chartist from 'chartist';
import { AccountService, AlertService } from '../../_services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

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
          password: ['', Validators.required]
      });
      
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      
      this.accountService.adminlogin(this.f.userName.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {                  
                  if(data['code']!=200){
                    this.alertService.error(data['message']);
                    this.loading = false;
                  }else{
                  this.router.navigate([this.returnUrl]);                  
                  }
              },
              error => {
                  this.alertService.error(error.message);
                  this.loading = false;
              });
  }
}
