import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginTokenService } from './login-token.service';
import { Teacher } from '../interfaces/teacher.interface';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient,
    private loginTokenService: LoginTokenService) {
    this.baseUrl = 'http://localhost:3000/api/teachers'
  }

  getAllTeachers() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}`, this.loginTokenService.getTokenHeader())
    )
  }

  getTeacherById(pTeacherId: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${pTeacherId}`));
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

  createNewTeacher(newTeacher: Teacher) {
    return firstValueFrom(
      this.httpClient.post<Teacher>(`${this.baseUrl}`, newTeacher)
    );
  }

  updateTeacher(pTeacherId: number) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${pTeacherId}`, this.loginTokenService.getTokenHeader())
    );
  }
}
