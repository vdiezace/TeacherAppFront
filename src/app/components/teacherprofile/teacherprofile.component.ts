import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';
;

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {

  teacherData: any;
  constructor(private teachersService: TeachersService,
    private loginTokenService: LoginTokenService) {
  }

  async ngOnInit() {
    try {
      const response = await this.teachersService.getTeacherById(this.loginTokenService.getId());
      console.log(response);
      this.teacherData = response;
      if (this.teacherData) {
        console.log(this.teacherData.avatar);
      }
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    };
  }
}