import { Component } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-landing-teacher',
  templateUrl: './landing-teacher.component.html',
  styleUrls: ['./landing-teacher.component.css']
})
export class LandingTeacherComponent {
  teacher: any;
  reviews: any;
  hasError: boolean = false;
  public teacherData: any;






  constructor(private teachersService: TeachersService,
    private reviewsService: ReviewsService,
    private loginTokenService: LoginTokenService) {
    this.teacher = [];



  }
  ngOnInit() {
    this.getTeacherById(this.loginTokenService.getId());
  }

  async getTeacherById(teacherId: number) {
    try {
      const response = await this.teachersService.getTeacherById(teacherId);
      this.teacher = response;
      this.teacherData = this.teacher;
    } catch (error) {
    }
  }
}




