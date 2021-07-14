import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventsCategoriesService {   

    constructor(
        private http: HttpClient
    ) {}

    getEventsCategoriesList(params: any) {
        return this.http.post(`${environment.apiUrl}/events/categories/getEventsCategoriesList`,params);           
    }
    delete(params) {
        return this.http.post(`${environment.apiUrl}/events/categories/delete`,params)
    }
    countAll() {
        return this.http.get(`${environment.apiUrl}/events/categories/count`);
    }
    
   
    
}