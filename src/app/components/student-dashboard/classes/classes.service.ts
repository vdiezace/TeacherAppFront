import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  baseUrl: string;

  constructor( private httpClient: HttpClient) {

    this.baseUrl = 'http://localhost:3000/api/student-classes'
   }

   
}
