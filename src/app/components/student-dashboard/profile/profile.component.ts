import { LoginTokenService } from './../../../services/login-token.service';
import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

public userData : any;

  constructor( private studentService: StudentsService,
    private loginTokenService: LoginTokenService) {
  }

  async ngOnInit() {
    const response = await this.studentService.getStudentById(this.loginTokenService.getId());
    console.log(response);
    this.userData= response;
    if (this.userData){
    console.log(this.userData.avatar);
    }
  }

}
