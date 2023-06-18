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

  students: Student[];
  review: Review[];
  myReviews: any[];
  myStudents: any[];

  constructor(
    private classesService: ClassesService,
    private loginTokenService: LoginTokenService,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private reviewsService: ReviewsService
  ) {
    this.review = [];
    this.myStudents = [];
    this.myReviews = [];
    this.students = [];
  }

  async ngOnInit() {
    this.review = await this.reviewsService.getReviewsByTeacherId();
    console.log(this.review);

    this.myReviews = await this.reviewsService.getReviewsByTeacherIdAndStudentId();
    console.log(this.myReviews);

    this.myStudents = this.students.filter((student) => {
      return this.myReviews.some((cl) => {
        return cl.students_id === student.id;
      });
    });
    console.log(this.myStudents);
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
