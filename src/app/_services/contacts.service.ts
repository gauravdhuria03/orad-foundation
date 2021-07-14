import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactsService {   

    constructor(
        private http: HttpClient
    ) {}

    getContactsList(params: any) {
        return this.http.post(`${environment.apiUrl}/contacts/getContactsList`,params);           
    }
    delete(params) {
        return this.http.post(`${environment.apiUrl}/contacts/delete`,params)
    }
    countAll() {
        return this.http.get(`${environment.apiUrl}/contacts/count`);
    }
    
   
    
}