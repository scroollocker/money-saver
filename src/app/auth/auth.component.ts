import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  errMessage = '';
  isAuth = true

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  activateReg() {
    this.isAuth = false;
  }

  activateAuth() {
    this.isAuth = true;
  }

  auth(login, pass) {
    this.errMessage = '';
    const loginStr = login.value;
    const passStr = pass.value;

    if (loginStr.length < 4) {
      this.errMessage = 'Не верно заполнен Login';
    }
    else if (passStr.length <= 0) {
      this.errMessage = 'Не верно заполнен Password';
    }

    this.authService.doAuth(loginStr, passStr)
      .subscribe((result: boolean) => {
        if (result) {
          //console.log(this.authService.token);
          this.router.navigateByUrl('/groups');
        }
        else {
          this.errMessage = 'Неверный логин или пароль';
        }
      },(error) => {
        this.errMessage = 'Произошла системная ошибка. Повторите позднее';
      });
  }

  register(user, pass, passConfirm) {
    let username = user.value;
    let password = pass.value;
    let passwConfirm = passConfirm.value
    this.errMessage = '';

    if (username && password && passwConfirm) {
      if (password === passwConfirm) {
        if (username.length >= 4) {
          this.authService.doReg(username, password)
            .subscribe((result: boolean) => {
              if (result) {
                // console.log(this.authService.token);
                this.router.navigateByUrl('/groups');
              }
              else {
                this.errMessage = 'Неверный логин или пароль';
              }
            },(error) => {
              this.errMessage = 'Произошла системная ошибка. Повторите позднее';
            });
        }
        else {
          this.errMessage = 'Имя пользователя должно быть больше 4 символов';
        }
      }
      else {
        this.errMessage = 'Введенные пароли не совпадают';
      }
    }
    else {
      this.errMessage = 'Не все поля заполнены';
    }

  }

}
