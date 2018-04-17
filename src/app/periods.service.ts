import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';

@Injectable()
export class PeriodsService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getPeriods(group_id: number, user_id: number) {

    var url = environment.apiUrl + 'periods/byGroup/' + group_id + '/' + user_id + '?token='+this.authService.token;

    return this.http.get(url);

  }

}
