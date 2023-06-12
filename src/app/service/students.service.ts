import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl ='http://localhost:3000/api/students'
   }

   getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
   }
}
