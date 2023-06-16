import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginTokenService } from './login-token.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl: string;


  constructor(private httpClient: HttpClient,
    private loginTokenService: LoginTokenService) {
    this.baseUrl = 'http://localhost:3000/api/students';

   }
 
  getStudentData() {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/${this.loginTokenService.getId()}`,httpOptions)
    );
  }
}

