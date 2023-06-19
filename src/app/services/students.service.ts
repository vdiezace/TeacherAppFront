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
 
  getStudentData() {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/${this.loginTokenService.getId()}`, this.loginTokenService.getTokenHeader())
    );
  }


  getAllStudents() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}`, httpOptions)
    )
  } 

  getStudentById(pStudentId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pStudentId}`, httpOptions)
    );
  }

  createNewStudent(newStudent: Student) {
    return firstValueFrom(
      this.httpClient.post<Student>(`${this.baseUrl}`, newStudent)
    );
  }

  updateStudent(pStudentId: number, studentData: any) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${pStudentId}`, studentData, this.loginTokenService.getTokenHeader())
    );
  }

  deleteStudent(pStudentId: number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${pStudentId}`, this.loginTokenService.getTokenHeader())
    );
  }

  getStudentActiveStatus() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/status/active`)
    );
  }

  getStudentDiactiveStatus() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/status/diactive`)
    );
  }

  activateStudent(pStudentId: number) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${pStudentId}/active`, this.loginTokenService.getTokenHeader())
    );
  }

}

