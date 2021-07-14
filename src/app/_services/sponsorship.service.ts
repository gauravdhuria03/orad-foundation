import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SponsorshipService {
    

    constructor(
        private http: HttpClient
    ) {}

  


    getSponsorshipList(params: any):Rx.Observable<any> {
        return this.http.post(`${environment.apiUrl}/sponsorship/getSponsorshipList`,params);
           
    }
    delete(params) {
        return this.http.post(`${environment.apiUrl}/sponsorship/delete`,params)
    }

    countAll() {
        return this.http.get(`${environment.apiUrl}/sponsorship/count`);
    }
   
    
}