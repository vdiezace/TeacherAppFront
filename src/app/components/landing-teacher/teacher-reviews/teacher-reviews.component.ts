import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review.interface';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-teacher-reviews',
  templateUrl: './teacher-reviews.component.html',
  styleUrls: ['./teacher-reviews.component.css']
})
export class TeacherReviewsComponent implements OnInit {
  teacherID: number = 18;
  reviews: any[];
  users_id: any;
  avg_rating: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {
    this.reviews = [];
    
  }

  ngOnInit() {
    this.getTeacherReviews();
    
  }

  getTeacherRating() {
    this.route.paramMap.subscribe((params) => {
      const usersId = params.get('users_id');
      const url = `/teachers/home/${usersId}`;
      console.log(url)
  
      this.http.get(url).subscribe(
        (responseRating: any) => {
          this.avg_rating = responseRating;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  getTeacherReviews() {
    this.http.get(`/api/teachers/${this.teacherID}/reviews`).subscribe(
      (response: any) => {
        this.reviews = response;
        console.log(this.reviews);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}


