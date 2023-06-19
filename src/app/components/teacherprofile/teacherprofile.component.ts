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

  teacherData: any;
  constructor(private TeachersService: TeachersService,
    private loginTokenService: LoginTokenService) {
  }

  async ngOnInit() {
    const response = await this.TeachersService.getTeacherById(this.loginTokenService.getId());
    //console.log(response);
    this.teacherData = response;
    if (this.teacherData) {
      console.log(this.teacherData.avatar);
    }
  }
}