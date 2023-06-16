import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersReviewsService {

  private baseUrl: string='http://localhost:3000/';
  //helper = new JwtHelperService();

  public userId= 0;

/*   constructor(private httpClient: HttpClient) {
    let token: any;
    if (token = localStorage.getItem('token')) {
      this.userId = this.helper.decodeToken(token).user_id;

    }
   }

 */  

/*    getTeacherById(teacherId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'api/teachers/' + teacherId, httpOptions)
    );
   }
 */
/*    reviewTeacher(teacherId: number, rating: number, comment: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!,
        'Content-Type': 'application/json'
      })
    }
    const toSend = {
      teacher_id: teacherId,
      student_id: this.userId,
      rating,
      comment
    };
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl + 'api/reviews', toSend, httpOptions)
    );
   }
 */}
