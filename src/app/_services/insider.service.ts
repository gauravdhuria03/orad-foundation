import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InsiderService {
    

    constructor(
        private http: HttpClient
    ) {}

  

    add(params: any) {
        return this.http.post(`${environment.apiUrl}/insider/add`,params);           
    }
    getInsiderList(params: any) {
        return this.http.post(`${environment.apiUrl}/insider/getInsiderList`,params);
           
    }
    delete(params) {
        return this.http.post(`${environment.apiUrl}/insider/delete`,params)
    }

    countAll() {
        return this.http.get(`${environment.apiUrl}/insider/count`);
    }
   
    
}