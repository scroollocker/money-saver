import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {AuthService} from './auth.service';
import { HttpClientModule} from '@angular/common/http';
import { AppRouterModule } from './/app-router.module';
import { NavigationComponent } from './navigation/navigation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GroupsComponent } from './groups/groups.component';
import { GroupService } from './group.service';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import { GroupDetailComponent } from './group-detail/group-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavigationComponent,
    GroupsComponent,
    GroupDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouterModule,
    NgbModule.forRoot()
  ],
  providers: [ AuthService, GroupService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
