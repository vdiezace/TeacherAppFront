import { Component } from '@angular/core';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-reviewsof-teachers',
  templateUrl: './reviewsof-teachers.component.html',
  styleUrls: ['./reviewsof-teachers.component.css']
})
export class ReviewsofTeachersComponent {
  teacher: any;
  reviews: any;
  public teacherData : any ;
 
  

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
    console.log(error);
  }
}
}

