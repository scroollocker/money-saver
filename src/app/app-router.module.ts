import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {GroupsComponent} from './groups/groups.component';
import {AuthGuard} from './auth.guard';
import {GroupDetailComponent} from './group-detail/group-detail.component';

const route: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'groups',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', component: GroupsComponent },
          { path: ':groupId', component: GroupDetailComponent }
        ]
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(route, {useHash: true, enableTracing: true})],
  declarations: []
})
export class AppRouterModule { }
