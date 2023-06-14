import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private baseUrl: string='http://localhost:3000/api/students-classes/';
  helper = new JwtHelperService();


  constructor( private httpClient: HttpClient) {
    let token = null;
    if (token = localStorage.getItem('token')) {
      const userId = this.helper.decodeToken(token).user_id;
      this.baseUrl = 'http://localhost:3000/api/students-classes/'+ userId;

    }
   }

   getStudentClasses() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl, httpOptions)
    ); 
   
   }
}
