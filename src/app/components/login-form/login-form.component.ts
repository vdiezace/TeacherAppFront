import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  formulario: FormGroup;

  constructor( private usersService: UsersService) {
    this.formulario = new FormGroup ({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    const response = await this.usersService.login(this.formulario.value);
    if(response.fatal) {
      return alert (response.fatal);
    }
    
    localStorage.setItem('token', response.token);
  
  }

}
