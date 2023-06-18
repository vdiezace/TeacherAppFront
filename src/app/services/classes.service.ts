import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginTokenService } from './login-token.service';
import { Class } from '../interfaces/class.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private baseUrl_classes: string;
  private baseUrl_studentClasses: string;
  private baseUrl_teacherClasses: string;

  constructor(private httpClient: HttpClient, private loginTokenService: LoginTokenService) {
    this.baseUrl_classes = "http://localhost:3000/api/classes";
    this.baseUrl_studentClasses = "http://localhost:3000/api/students-classes";
    this.baseUrl_teacherClasses = "http://localhost:3000/api/teachers-classes";
  }

  getStudentClasses(pStudentId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl_studentClasses}/${pStudentId}`, httpOptions))
  }

  getBookedClassesByTeacherAndDate(pTeacherId: number, pDate: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl_classes}/teacher/teacher=${pTeacherId}&date=${pDate}`, httpOptions))
  }

  create(newClass: Class) {
    return firstValueFrom(this.httpClient.post<Class>(this.baseUrl_classes, newClass))
  }

  getTeacherClasses(pTeacherId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl_teacherClasses}/${pTeacherId}`, httpOptions))
  }

  getLoggedStudentClasses() {
    return this.getStudentClasses(this.loginTokenService.getId());
  }

  deleteClasses() {
    
  }
}
