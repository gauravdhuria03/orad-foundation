import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as moment from "moment-timezone";
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AngularEditorConfig } from "@kolkov/angular-editor";
import Swal from "sweetalert2";

import { EventsCategoriesService,EventsService,AccountService, AlertService } from '../../../_services';
@Component({
  selector: 'add-event',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddEventComponent implements OnInit {
  loading = false;
  submitted = false;
  data = [];
  eventsCategoriesData = [];
  
  selectedEventId:any;
  form: FormGroup;
  moment= moment;
  minStartDate = new Date();
  minEndDate=new Date();
  
  sTime: any;
  eTime: any;
  sDate: any;
  eDate: any;
  defaulTime:any;
  imagePath:any;
  imageSrc:any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "200px",
    minHeight: "200px",
    maxHeight: "5000",
    width: "auto",
    minWidth: "500",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    toolbarHiddenButtons: [["fontName"], ["insertImage", "insertVideo"]],
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private eventsService:EventsService,
      private alertService: AlertService,
  ) { }

  ngOnInit() {
    const d = new Date();

    this.defaulTime = d;

    this.form = this.formBuilder.group({
        title: new FormControl('', [
              Validators.required
            ]),
      overview: new FormControl('', [
        Validators.required
      ]),
      zoomLink: new FormControl('', [
        Validators.required
      ]),
      zoomId: new FormControl('', [
        Validators.required
      ]),
      category_id: new FormControl('', [
              Validators.required
            ]),
      startDate: new FormControl(this.minStartDate, [
        Validators.required
      ]),
      endDate: new FormControl(this.minEndDate, [
        Validators.required
      ]),    
      startTime: new FormControl(this.defaulTime, [
        Validators.required
      ]),
      endTime: new FormControl(this.defaulTime, [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required
      ]),
   });   

    this.loading = true;
    
    console.log('location.origin===',location.origin);
    this.getEventsCategories();    
  }
  get f() { return this.form.controls; }
 
  


  getEventsCategories(){
    this.eventsService.getEventsCategories()
    .pipe(first())
    .subscribe(
        res => {                  
            if(res['code']!=200){
              this.alertService.error(res['message']);
              this.loading = false;
            }else{
             this.eventsCategoriesData=res['data'];  
            
            }
            console.log("eventsCategoriesData==",this.eventsCategoriesData);
        },
        error => {
            this.alertService.error(error.message);
            this.loading = false;
        });    

  }
  onValueChange(e){
    
    this.form.get('endDate').patchValue('');
    this.minEndDate=e.target.value;
    console.log("this.minEndDate==",this.minEndDate);
}
onStarTimeChange(e){
  console.log("estart time",e);

}
onEndTimeChange(e){
  console.log("end time",e);
}

uploadEventImage(e){

 
  console.log(" e.target.file==", e.target.files);
  console.log(" e.target.file==", e.target.files);
  this.progress = 0;
  this.selectedFiles = e.target.files;
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e: any) => {
    const image = new Image();
    image.src = e.target.result;
    image.onload = (rs) => {
      const img_height = rs.currentTarget["height"];
      const img_width = rs.currentTarget["width"];

      if (img_height != 800 && img_width != 1200) {
        this.loading = false;
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Height and Width must be 600 * 400.",
          focusConfirm: true,
          confirmButtonColor: "#000000",
          confirmButtonText: "OK",
        });
        return false;
      }else{
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;
      console.log(" currentFile==", this.currentFile);
      this.eventsService.upload(this.currentFile).subscribe(
        (event: any) => {
          console.log("event===",event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.imagePath='/uploads/images/events/'+event.body.data.filename;
            console.log("this.imagePath====",this.imagePath);
            this.imageSrc=environment.baseUrl+this.imagePath;
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });
    }

    this.selectedFiles = undefined;
    }
  }
  
  }
}


  onSubmit() {
    this.submitted = true;
    console.log("kjdkjdkdjddjkdk");

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("invalid");
        return;
    }

   this.loading = true;
   let startTime= moment(this.form.value.startTime).utc().unix();
   let endTime=moment(this.form.value.endTime).utc().unix();

   let startDate=moment(this.form.value.startDate).utc().unix();
   let endDate=moment(this.form.value.endDate).utc().unix();

   console.log("endDate=========",endDate);
    let params = {     
      "title": this.form.value.title,
      "overview": this.form.value.overview,
      "zoomLink": this.form.value.zoomLink,
      'zoomId':this.form.value.zoomId,
      "category_id": this.form.value.category_id,
      'startDate':startDate,
      'endDate':endDate,
      "startTime": startTime,
      "endTime": endTime,
      "image":this.imagePath
    
  };
    this.eventsService.add(params)
        .pipe(first())
        .subscribe(
            data => {                  
                if(data['code']!=200){
                  this.alertService.error(data['message']);
                  this.loading = false;
                }else{
                  this.alertService.error(data['message']);  
                  this.router.navigate(['/admin/events']);                  
                }
            },
            error => {
                this.alertService.error(error.message);
                this.loading = false;
            });
  }

}
