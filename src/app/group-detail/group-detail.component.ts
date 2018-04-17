import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs/observable/of';
import {NgbDateStruct, NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Group} from '../models/Group';
import {GroupService} from '../group.service';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';
import {PeriodsService} from '../periods.service';
import {Period} from '../models/Period';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group_id = 0;
  currentJustify = 'fill';

  date_start_model = null;
  date_end_model = null;

  editPeriod: Period;

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

  empty(content: any) {
    if (content === null || content === undefined) {
      return true;
    }
    if (Array.isArray(content) && content.length <= 0) {
      return true;
    }
    if (content.length === 0) {
      return true;
    }

    return false;
  }

  addNewPeriod(content) {
    let period = new Period();

    this.openModal(content, period);
  }

  openModal(content, period) {

    console.log(period);
    this.editPeriod = period;
    this.modalService.open(content);
  }

  closeModal(close) {
    close();
  }

  constructor(private activeRoute: ActivatedRoute,
              private groupService: GroupService,
              private authService: AuthService,
              private periodService: PeriodsService,
              private router: Router,
              private modalService: NgbModal) { }

  loadGroupInfo() {


    const currentUser = this.authService.currentUser;

    if (currentUser) {
      this.groupInfo.error = '';
      this.groupInfo.isLoading = true;
      this.groupService.getGroupById(this.group_id, currentUser.user_id).subscribe(
        (result:any) => {
          this.groupInfo.isLoading = false;
          if (result.status) {
            this.groupInfo.content = result.group;
          }
          else {
            this.groupInfo.error = result.message;
          }
        },
        (error) => {
          this.groupInfo.isLoading = false;
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

    const currentUser = this.authService.currentUser;

    if (currentUser) {
      this.periods.error = '';
      this.periods.isLoading = true;


      this.periodService.getPeriods(this.group_id, currentUser.user_id).subscribe(
        (result: any) => {
          this.periods.isLoading = false;
          if (result.status) {
            this.periods.content = result.periods;
          }
          else {
            this.periods.error = result.message;
          }
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigateByUrl('/login');
          }
          else {
            this.periods.error = 'Произошла системная ошибка...';
          }
        }
      )

    }




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


      this.loadPeriodGroup();
  //  });
  }

}
