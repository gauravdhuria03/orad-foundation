import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../_models';

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
    countAll() {
        return this.http.get(`${environment.apiUrl}/events/count`);
    }
    
    
    getById(id: string) {        
        return this.http.get<Event>(`${environment.apiUrl}/events/details/${id}`);
    }
   
    
}