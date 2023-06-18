import { TeachersService } from 'src/app/services/teachers.service';
import { Component } from '@angular/core';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  myReviews: any[];
  teachers: any[]
  constructor(private reviewsService: ReviewsService,
    private teacherService:  TeachersService,
    private loginTokenService: LoginTokenService) {

    this.myReviews = [];
    this.teachers = [];
  }

  round(n: number){
    return Math.round(n);
  }

  async ngOnInit() {
    try {
      const response = await this.reviewsService.getReviewByStudent(this.loginTokenService.getId());
      this.myReviews = response;  
      console.log(response);
      this.teachers = await this.teacherService.getAllTeachers();
      console.log(this.teachers);
      this.myReviews.forEach((review) => {
        for(let i = 0; i < this.teachers.length; i++) {
          if(review.teachers_id === this.teachers[i].teacher_id) {
            review.teacherData = this.teachers[i];
            break;
          }
        }
      });
      console.log(this.myReviews);
    }catch(err) {
      return err;
    }
  } 




}
