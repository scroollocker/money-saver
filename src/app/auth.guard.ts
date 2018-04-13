import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    console.log('Token', this.authService.token);

    if (this.authService.token !== null) {
      console.log('In guard', true);
      return of(true)
    }
    else {
      console.log('Redirect to login');

      this.router.navigateByUrl('/login');

      return of(true)
    }
  }
}
