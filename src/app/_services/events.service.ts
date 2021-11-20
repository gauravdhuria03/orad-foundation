import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../_models';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventsService {   

    constructor(
        private http: HttpClient
    ) {}

    getEventsList(params: any) {
        return this.http.post(`${environment.apiUrl}/events/getEventsList`,params);           
    }
    delete(params) {
        return this.http.post(`${environment.apiUrl}/events/delete`,params)
    }
    update(params) {
        return this.http.post(`${environment.apiUrl}/events/updateEvent`, params);
           
    }
    add(params) {
        return this.http.post(`${environment.apiUrl}/events/add`, params);
           
    }
    countAll() {
        return this.http.get(`${environment.apiUrl}/events/count`);
    }
    
    
    getById(id: string) {        
        return this.http.get<Event>(`${environment.apiUrl}/events/details/${id}`);
    }
    getEventsCategories() {        
        return this.http.get(`${environment.apiUrl}/events/categories/getEventsCategoriesList`);
    }
   
  
      upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
    
        formData.append('file', file);
    
        const req = new HttpRequest('POST', `${environment.apiUrl}/events/uploadImage`, formData, {
          reportProgress: true       
        });
        return this.http.request(req);
    }
}