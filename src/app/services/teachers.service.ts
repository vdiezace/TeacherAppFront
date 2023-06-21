import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginTokenService } from './login-token.service';
import { Teacher } from '../interfaces/teacher.interface';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private baseUrl: string;
  private baseUrlClasses: string;

  constructor(private httpClient: HttpClient,
    private loginTokenService: LoginTokenService) {
    this.baseUrl = 'http://localhost:3000/api/teachers';
    this.baseUrlClasses = 'http://localhost:3000/api/teachers-classes';
  }



  getAllTeachers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}`, httpOptions)
    )
  }

  getTeacherClassesByStudentId(pStudentId: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrlClasses}/${pStudentId}`))
  }

  getTeacherById(pTeacherId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pTeacherId}`, httpOptions));
  }

  getTeacherClassHours(pTeacherId: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/hours/${pTeacherId}`)
    );
  }

  getTeachersByFilters(pFilterId: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/filters/${pFilterId}`)
    );
  }

  createNewTeacher(newTeacher: Teacher): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<Teacher>(`${this.baseUrl}`, newTeacher, this.loginTokenService.getTokenHeader())
    );
  }

  updateTeacher(pTeacherId: any): Promise<any> {
    // console.log(teacherData);
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${pTeacherId.id}`, pTeacherId, this.loginTokenService.getTokenHeader())
    );
  }

  updateValidateTeacher(pTeacherId: number) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/validate/${pTeacherId}`, this.loginTokenService.getTokenHeader())
    );
  }

  deleteTeacher(pTeacherId: number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/${pTeacherId}`, this.loginTokenService.getTokenHeader())
    );
  }

}
