import { Component } from '@angular/core';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-reviews-teachers',
  templateUrl: './reviews-teachers.component.html',
  styleUrls: ['./reviews-teachers.component.css']
})
export class ReviewsTeachersComponent {
  teacher: any;
  reviews: any;
  public teacherData : any ;
  public reviewData: any;
 
  

constructor(private teachersService: TeachersService,
  private reviewsService: ReviewsService,
  private loginTokenService: LoginTokenService) {
  this.teacher = [];
  
 

}
async ngOnInit() {
  this.getTeacherById(this.loginTokenService.getId());

  const response = await this.reviewsService.getReviewsByTeacherId(this.loginTokenService.getId());
  console.log(response);
  this.reviewData= response;
  if (this.reviewData){
  console.log(this.reviewData.comment);
  }
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