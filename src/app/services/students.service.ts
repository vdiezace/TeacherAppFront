import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginTokenService } from './login-token.service';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl: string;


  constructor(private httpClient: HttpClient,
    private loginTokenService: LoginTokenService) {
    this.baseUrl = 'http://localhost:3000/api/students';

  }

  getStudentData(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/${this.loginTokenService.getId()}`, this.loginTokenService.getTokenHeader())
    );
  }


  getAllStudents(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}`, httpOptions)
    )
  }

  getStudentById(pStudentId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pStudentId}`, httpOptions)
    );
  }

  createNewStudent(pStudent: Student): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<Student>(this.baseUrl, pStudent, this.loginTokenService.getTokenHeader())
    );
  }

  updateStudent(pStudent: any): Promise<any> {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${pStudent.id}`, pStudent, this.loginTokenService.getTokenHeader())
    );
  }


  deleteStudent(pStudentId: number): Promise<any> {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${pStudentId}`, this.loginTokenService.getTokenHeader())
    );
  }

  getStudentActiveStatus(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/status/active`)
    );
  }

  getStudentDiactiveStatus(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/status/deactive`)
    );
  }

  activateStudent(pStudentId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }

    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${pStudentId}/active`, httpOptions)
    );
  }

}

