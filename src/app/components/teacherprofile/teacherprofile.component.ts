import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {
  userForm: FormGroup;
  teacher: any;
  teacherId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teacherService: TeacherService
  ) {
    this.userForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      Address: new FormControl('', [
        Validators.required
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        Validators.email
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      Image: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const teacherId = params.get('teacher_id');
      if (teacherId) {
        this.teacherId = teacherId;
        this.getTeacherProfile();
      }
    });
  }

  getTeacherProfile() {
    this.teacherService.getTeacherById(this.teacherId!)
      .then((teacher: any) => {
        this.teacher = teacher;

        this.userForm.patchValue({
          Name: this.teacher.first_name,
          Surname: this.teacher.last_name,
          Address: this.teacher.address,
          Email: this.teacher.email,
          Password: this.teacher.password,
          Image: this.teacher.avatar
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getDataForm() {
    console.log(this.userForm.value);
  }
}
