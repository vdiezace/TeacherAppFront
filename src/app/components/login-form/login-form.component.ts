import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  formulario: FormGroup;
  helper = new JwtHelperService();

  constructor(private usersService: UsersService, private router: Router) {
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
    localStorage.setItem('user-token', response.token);

    const userRole = this.helper.decodeToken(response.token).user_role;
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
