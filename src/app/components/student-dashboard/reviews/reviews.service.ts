import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseUrl: string = 'http://localhost:3000/';
  helper = new JwtHelperService();
  userId = 0;

  constructor(private httpClient: HttpClient) { 

  let token;
  if(token = localStorage.getItem('token')) {
    this.userId = this.helper.decodeToken(token).user_id;
  }
    //this.baseUrl = 'http://localhost:3000/api/reviews/student'
  }

  getReviewsByStudentId() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    };
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'api/reviews/student/' + this.userId, httpOptions)
    )

  }

}

