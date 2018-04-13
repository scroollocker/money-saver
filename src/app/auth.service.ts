import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  _token: string;
  _currentUser = null;

  constructor(private http: HttpClient) {
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this._token = this._currentUser && this._currentUser.token;
  }

  doAuth(username: string, password: string):Observable<boolean> {
    const apiUrl = environment.apiUrl + 'users/auth';
    var request = {
      username: username,
      password: password
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let ob = Observable.create((o) => {
      this.http.post(apiUrl, JSON.stringify(request), {headers: headers})
        .subscribe((result:any) => {
          if (result.status) {
            let token = result.token;
            let user_id = result.user_id;
            this._token = token;
            var data = {
              username: username,
              token: token,
              user_id: user_id
            }
            this._currentUser = data;
            localStorage.setItem('currentUser', JSON.stringify(data));
            o.next(true);
          }
          else {
            o.next(false);
          }
        },(error) => {
          o.error(error);
        });
    });

    return ob;
  }

  doReg(username: string, password: string):Observable<boolean> {
    const apiUrl = environment.apiUrl + 'users/register';
    var request = {
      username: username,
      password: password
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let ob = Observable.create((o) => {
      this.http.post(apiUrl, JSON.stringify(request), {headers: headers})
        .subscribe((result:any) => {
          if (result.status) {
            let token = result.token;
            let user_id = result.user_id;
            this._token = token;
            var data = {
              username: username,
              token: token,
              user_id: user_id
            }
            this._currentUser = data;
            localStorage.setItem('currentUser', JSON.stringify(data));
            o.next(true);
          }
          else {
            o.next(false);
          }
        },(error) => {
          o.error(error);
        });
    });

    return ob;
  }

  get token() {
    return this._token;
  }

  get currentUser() {
    return this._currentUser;
  }


}
