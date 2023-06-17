import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup | any;
  student_role_id = 3;

  constructor(
    private router: Router,
  ) {


    this.studentForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      Email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        Validators.email
      ]),
      Password: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      RepitePassword: new FormControl("", [
        Validators.required
      ]),
      Address: new FormControl("", [
        Validators.required
      ]),
      Phone: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      province_id: new FormControl("", [
        Validators.required
      ]),
      city_id: new FormControl("", [
        Validators.required
      ]),
      Image: new FormControl("", [])

    }, []);
  }



  getDataForm() {
    console.log(this.studentForm)
  }
  ngOnInit(): void {

  }

}
