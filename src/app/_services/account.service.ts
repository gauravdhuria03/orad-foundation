import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.http.post<User>(`${environment.apiUrl}/users/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('STATE', 'true');
                localStorage.setItem('ROLE', 'user');
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }
    logout() {
        // remove user from local storage and set current user to null
        
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/home']);
    }
    adminlogin(userName, password) {
        return this.http.post<User>(`${environment.apiUrl}/users/adminlogin`, { userName, password })
            .pipe(map(user => {
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes              
                    if(user['code']==200){
                        
                    localStorage.setItem('user', JSON.stringify(user['data']['userInfo']));
                    this.userSubject.next(user);
                    return user;
                    }else{
                        return user;
                    }
            
              
            }));
    }
    
    adminlogout() {
        // remove user from local storage and set current user to null
        
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/admin/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll(params: any) {
        return this.http.post<User[]>(`${environment.apiUrl}/users/list`,params);
    }
    countAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users/count`);
    }
    getDashboardCounts() {
        return this.http.get<User[]>(`${environment.apiUrl}/users/getDashboardCounts`);
    }
    

    getById(id: string) {
        
        return this.http.get<User>(`${environment.apiUrl}/users/details/${id}`);
    }

    update(params) {
        return this.http.post(`${environment.apiUrl}/users/updateProfileFromBackend`, params);
           
    }

    delete(params) {
        return this.http.post(`${environment.apiUrl}/users/delete`,params)
    }

    changestatus(params) {
        return this.http.post(`${environment.apiUrl}/users/changeStatusFromBackend`, params);
           
    }
    
}