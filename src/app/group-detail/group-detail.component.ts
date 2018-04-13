import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs/observable/of';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Group} from '../models/Group';
import {GroupService} from '../group.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group_id = 0;
  currentJustify = 'fill';

  mainData = {
    error: '',
    isLoading: true,
    content: ''
  }

  groupInfo = {
    error: '',
    isLoading: false,
    content: null
  };

  periods = {
    error: '',
    isLoading: false,
    content: []
  };

  users = {
    error: '',
    isLoading: false,
    content: []
  };

  constructor(private activeRoute: ActivatedRoute,
              private groupService: GroupService,
              private authService: AuthService,
              private router: Router) { }

  loadGroupInfo() {
    this.groupInfo.error = '';
    this.groupInfo.isLoading = true;

    const currentUser = this.authService.currentUser;

    if (currentUser) {
      this.groupService.getGroupById(this.group_id, currentUser.user_id).subscribe(
        (result:any) => {
          if (result.status) {
            this.groupInfo.content = result.group;
          }
          else {
            this.groupInfo.error = result.message;
          }
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigateByUrl('/login');
          }
          else {
            this.groupInfo.error = 'Произошла системная ошибка';
          }
        }
      )
    }



    // this.groupInfo.content;
  }

  loadPeriods() {
    this.periods.error = '';
    this.periods.isLoading = true;

    // this.periods.content;
  }

  loadUsers() {
    this.users.error = '';
    this.users.isLoading = true;

    // this.users.content;
  }

  beforeChange(event: NgbTabChangeEvent) {
    if (event.nextId == 'users') {
      this.loadUserGroup();
    }
    else if (event.nextId == 'periods') {
      this.loadPeriodGroup();
    }
  }

  loadPeriodGroup() {
    this.loadGroupInfo();
    this.loadPeriods();
  }

  loadUserGroup() {
    this.loadUsers();
  }

  ngOnInit() {
    this.mainData.error = '';
    this.mainData.isLoading = true;


    //this.activeRoute.paramMap.map((item) => {
      this.group_id  = +this.activeRoute.snapshot.paramMap.get('groupId');

      console.log(this.group_id);

      if (!this.group_id) {
        this.mainData.error = 'Неверные параметры';
      }

      this.mainData.isLoading = false;
  //  });
  }

}
