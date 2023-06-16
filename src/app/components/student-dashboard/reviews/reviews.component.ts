import { Component } from '@angular/core';
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  myReviews: any[];

  constructor(private reviewsService: ReviewsService) {

    this.myReviews = [];
  }

  async ngOnInit() {
    try {
      const response = await this.reviewsService.getReviewsByStudentId();
      console.log(response);  
    }catch(err) {
      return err;
    }
  } 


}
