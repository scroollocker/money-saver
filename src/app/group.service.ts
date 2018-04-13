import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getGroupByUserid(id: number) {

    const url = environment.apiUrl + 'groups/byUser/' + id + '/?token=' + this.authService.token;

    return this.http.get(url);

  }

  createGroup(name: string, user_id: number) {
    const url = environment.apiUrl + 'groups/create' + '/?token=' + this.authService.token;

    const request = {
      group_name: name,
      user_id: user_id
    };

    return this.http.post(url, request);
  }

  deleteGroup(group_id: number, user_id: number) {
    const url = environment.apiUrl + 'groups/delete' + '/?token='+this.authService.token;

    const request = {
      group_id: group_id,
      user_id: user_id
    };

    return this.http.post(url, request);
  }


}
