import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {


    this.userForm = new FormGroup({
      Name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      Surname: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      Address: new FormControl("", [
        Validators.required
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
      Image: new FormControl("")

    }, []);
  }



  getDataForm() {
    console.log(this.userForm)
  }
  ngOnInit(): void {

  }
}
