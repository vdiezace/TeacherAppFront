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

  constructor(private reviewsService: ReviewsService,
    private loginTokenService: LoginTokenService) {

    this.myReviews = [];
  }

  async ngOnInit() {
    try {
      const response = await this.reviewsService.getReviewByStudent(this.loginTokenService.getId());
      console.log(response);  
    }catch(err) {
      return err;
    }
  } 


}
