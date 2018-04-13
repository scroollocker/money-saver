import { Component, OnInit } from '@angular/core';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import {Group} from '../models/Group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  isLoading = false;
  btnLoading = false;
  editGroup:Group = null;

  private groups: Group[] = [];

  getGroups():Group[] {
    return this.groups;
  }

  loadGroups() {

    if (this.authService.currentUser && this.authService.currentUser.user_id) {
      this.isLoading = true;
      this.groupService.getGroupByUserid(this.authService.currentUser.user_id).subscribe(
        (result: any) => {
          this.isLoading = false;
          if (result.status) {
            this.groups = result.groups;
          }
          else {
            alert('Во время загрузки произошла ошибка');
          }
        },
        (error) => {
          this.isLoading = false;
          if (error.status === 401) {
            console.log('Redirect to login');
            this.route.navigateByUrl('/login');
          }
          else {
            alert('Произошла системная ошибка');
          }
        }
      )
    }
    else {
      console.log('Redirect to login');
      this.route.navigateByUrl('/login');
    }
  }

  closeModal(close) {
    close();
  }

  openModal(content) {
    this.editGroup = new Group();
    this.modalService.open(content);
  }

  save(close) {
    console.log(this.editGroup);

    const currentUser = this.authService.currentUser;

    if (currentUser) {
      this.btnLoading = true;
      this.groupService.createGroup(this.editGroup.name, currentUser.user_id).subscribe(
        (result: any) => {
          this.btnLoading = false;
          if (result.status) {
            this.loadGroups();
            close();
          }
          else {
            alert(result.message);
          }
        },
        (error) => {
          this.btnLoading = false;
          if (error.status === 401) {
            console.log('Redirect to login');
            this.route.navigateByUrl('/login');
          }
          else {
            alert('Произошла системная ошибка');
          }
        }
      );
    }
    else {
      console.log('Redirect to login');
      this.route.navigateByUrl('/login');
    }

  }

  removeGroup(group: Group) {

    if (!confirm("Вы действительно хотите удалить запись?")) {
      return;
    }

    const currentUser = this.authService.currentUser;
    if (group.group_id !== undefined && currentUser && currentUser.user_id) {
      this.groupService.deleteGroup(group.group_id, currentUser.user_id).subscribe(
        (result:any) => {
          if (result.status) {
            this.loadGroups();
          }
          else {
            alert(result.message);
          }
        },
        (error) => {
          if (error.status === 401) {
            console.log('Redirect to login');
            this.route.navigateByUrl('/login');
          }
          else {
            alert('Произошла системная ошибка');
          }
        }
      )
    }
  }

  openGroup(group: Group) {
    console.log(group);
    // this.route.
  }

  constructor(private groupService: GroupService,
              private route: Router,
              private authService: AuthService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.loadGroups();
  }

}
