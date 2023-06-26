import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(private usersService: UsersService,
    private loginTokenService: LoginTokenService,
    private router: Router,
    private teachersService: TeachersService) {

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
        const response = await this.teachersService.getTeacherById(this.loginTokenService.getId());
      if (response.is_approved){
        this.router.navigateByUrl('/teachers');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'It seems you havent been approved yet!'
        });
      }
        break;
    }
  }

}
