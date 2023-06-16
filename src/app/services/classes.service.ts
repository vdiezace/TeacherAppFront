import { HttpClient } from '@angular/common/http';
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
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl_studentClasses}/${pStudentId}`, this.loginTokenService.getTokenHeader()))
  }

  getBookedClassesByTeacherAndDate(pTeacherId: number, pDate: string) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl_classes}/teacher/teacher=${pTeacherId}&date=${pDate}`, this.loginTokenService.getTokenHeader()))
  }

  create(newClass: Class) {
    return firstValueFrom(this.httpClient.post<Class>(this.baseUrl_classes, newClass))
  }

  getTeacherClasses(pTeacherId: number) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl_teacherClasses}/${pTeacherId}`, this.loginTokenService.getTokenHeader()))
  }
}
