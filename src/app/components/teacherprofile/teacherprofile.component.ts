import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { TeachersService } from 'src/app/services/teachers.service';
;

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {
  userForm: FormGroup;
  teacher: any;
  teacherId: string | null = null;

  public teacherData : any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private teacherService: TeachersService,
    private loginTokenService: LoginTokenService
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

  async ngOnInit() {
    const teacherId = this.loginTokenService.getId();
    const response = await this.teacherService.getTeacherById(teacherId);
    console.log(response);
    this.teacherData = response;
    if (this.teacherData) {
      console.log(this.teacherData.avatar);
      this.FormWithTeacherData();
    }
  }

  FormWithTeacherData() {
    this.userForm.patchValue({
      Name: this.teacherData.first_name,
      Surname: this.teacherData.last_name,
      Address: this.teacherData.address,
      Email: this.teacherData.email,
      Password: this.teacherData.password,
      Image: this.teacherData.avatar
    });
  }
  
/*
  getTeacherProfile() {
    const teacherIdNumber = parseInt(this.teacherId!, 10); 
  
    this.teacherService.getTeacherById(teacherIdNumber)
      .then((teacher: any) => {
        this.teacher = teacher;
  
        // Resto del código...
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  /*
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
*/
  getDataForm() {
    console.log(this.userForm.value);
  }
    }