import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro-teacher',
  templateUrl: './registro-teacher.component.html',
  styleUrls: ['./registro-teacher.component.css']
})
export class RegistroTeacherComponent {
  teacherForm: FormGroup;

  constructor(
  ) {
    this.teacherForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      repitePassword: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      avatar: new FormControl(),
      province: new FormControl(),
      city: new FormControl()
    })
  }

  getDataForm() {

  }
}
