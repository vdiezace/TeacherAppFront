import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { ClassesService } from 'src/app/services/classes.service';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-reviews',
  templateUrl: './teacher-reviews.component.html',
  styleUrls: ['./teacher-reviews.component.css']
})
export class TeacherReviewsComponent  {

  myReviews: Review[];

  constructor(private reviewsService: ReviewsService) {
    this.myReviews = [];
  }

  ngOnInit() {
    this.getReviewsByTeacherIdAndStudentId();
  }

  getReviewsByTeacherIdAndStudentId() {
    this.reviewsService.getReviewsByTeacherIdAndStudentId().subscribe(
      (reviews: Review[]) => {
        this.myReviews = reviews;
        console.log(this.myReviews);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}










 /* teacher: any;
  review: any;
  public teacherData: any;
  public reviewData: any;

  private baseUrl = '/api/reviews';

  constructor(
    private httpClient: HttpClient,
    private teachersService: TeachersService,
    private reviewService: ReviewsService,
    private loginTokenService: LoginTokenService
  ) {
    this.teacher = [];
  }

  ngOnInit() {
    this.getTeacherById(this.loginTokenService.getId());
    this.getReviewsByTeacherId();
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

  async getReviewsByTeacherId() {
    try {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')!
        })
      };
      const response = await firstValueFrom(
        this.httpClient.get<any[]>(`${this.baseUrl}/${this.loginTokenService.getId()}`, httpOptions)
      );
      this.reviewData = response;
    } catch (error) {
      console.log(error);
    }
  }
}
*/
