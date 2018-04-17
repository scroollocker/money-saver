import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {AuthService} from './auth.service';
import { HttpClientModule} from '@angular/common/http';
import { AppRouterModule } from './/app-router.module';
import { NavigationComponent } from './navigation/navigation.component';
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GroupsComponent } from './groups/groups.component';
import { GroupService } from './group.service';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { PeriodsService } from './periods.service';
import {MomentModule} from 'ngx-moment';
import {NgbDateFRParserFormatter} from './ngb-date-fr-parser-formatter';
import {NgbDateStructAdapter} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-adapter';
import {NgbStringAdapter} from './ngb-date-adapter';


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
    MomentModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    GroupService,
    AuthGuard, PeriodsService,
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    {provide: NgbDateAdapter, useClass: NgbStringAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
