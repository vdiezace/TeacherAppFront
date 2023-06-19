import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginTokenService } from './login-token.service';
import { firstValueFrom } from 'rxjs';
import { Review } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private loginTokenService: LoginTokenService) {
    this.baseUrl = "http://localhost:3000/api/reviews"
  }

  getReviewByStudent(pStudentId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/student/${pStudentId}`, httpOptions))
  }

  getReviewsByTeacherIdAndStudentId(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')!
    })
  }
  return firstValueFrom(
    this.httpClient.get<any[]>(`${this.baseUrl}`, httpOptions)
  )
} 

getReviewByTeacherIdAndStudentId(pTeacherId: number, pStudentId: number){
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')!
    })
  }
  return firstValueFrom(
    this.httpClient.get<any>(`${this.baseUrl}?teacherid=${pTeacherId}&studentid=${pStudentId}`, httpOptions)
  )
} 

 //getReviewsByTeacherId(pTeacherId: number) {
   // return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}?teacherid=${pTeacherId}`, this.loginTokenService.getTokenHeader()))
  //}

  getReviewsByTeacherId(pTeacherId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}/teacher/${pTeacherId}`, httpOptions)
    )
  } 

  create(newReview: Review) {
    return firstValueFrom(this.httpClient.post<Review>(this.baseUrl, newReview, this.loginTokenService.getTokenHeader()))
  }



updateReview(pReviewId: number, updateReview: Review) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')!
    })
  }
  return firstValueFrom(this.httpClient.put<Review>(`${this.baseUrl}/${pReviewId}`, updateReview, httpOptions))
}
}
