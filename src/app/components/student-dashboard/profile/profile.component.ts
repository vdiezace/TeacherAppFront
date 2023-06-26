import { LoginTokenService } from './../../../services/login-token.service';
import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userData: any;

  constructor(private studentService: StudentsService,
    private loginTokenService: LoginTokenService) {
  }

  async ngOnInit() {
    try {
      const response = await this.studentService.getStudentById(this.loginTokenService.getId());
      this.userData = response;
      if (this.userData) {
        console.log(this.userData.avatar);
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
