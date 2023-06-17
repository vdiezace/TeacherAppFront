import { LoginTokenService } from 'src/app/services/login-token.service';

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  formulario: FormGroup;

  constructor(private usersService: UsersService,
    private loginTokenService:  LoginTokenService,
    private router: Router) {
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    const response = await this.usersService.login(this.formulario.value);
    if (response.fatal) {
      return alert(response.fatal);
    }
    localStorage.setItem('token', response.token);

    const userRole = this.loginTokenService.getRole();
    switch (userRole) {
      case "student":
        this.router.navigateByUrl('/student/home');
        break;
      case "admin":
        this.router.navigateByUrl('/admin');
        break;
      case "teacher":
        this.router.navigateByUrl('/teachers');
        break;
    }
  }

}
