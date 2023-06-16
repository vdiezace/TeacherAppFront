import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private baseUrl: string = 'http://localhost:3000/';
  helper = new JwtHelperService();

  public userId = 0;

  constructor(private httpClient: HttpClient) {
    let token = null;
    if (token = localStorage.getItem('token')) {
      this.userId = this.helper.decodeToken(token).user_id;
      // this.baseUrl = 'http://localhost:3000/api/students-classes/'+ userId;

    }
  }

  getAllTeachers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'api/teachers', httpOptions)
    )
  }

  getTeachersByStudentId() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl + 'api/students-classes/' + this.userId, httpOptions)
    );

  }
}
