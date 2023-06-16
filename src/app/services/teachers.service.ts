import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/teachers'
  }

  getAllTeachers() {
    return firstValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    );
  }

  getTeachers() {
    return firstValueFrom(
      this.httpClient.get(this.baseUrl));
  }
}
