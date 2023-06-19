import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro-student',
  templateUrl: './registro-student.component.html',
  styleUrls: ['./registro-student.component.css']
})
export class RegistroStudentComponent {
  studentForm: FormGroup;

  constructor(
  ) {
    this.studentForm = new FormGroup({
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

