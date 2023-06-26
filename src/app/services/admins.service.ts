import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginTokenService } from './login-token.service';
import { firstValueFrom } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private loginTokenService: LoginTokenService
  ) {
    this.baseUrl = "http://localhost:3000/api/admin";
  }

  getAll() {
    return firstValueFrom(this.httpClient.get<any>(this.baseUrl, this.loginTokenService.getTokenHeader()));
  }

  getAdminById(pId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${pId}`, httpOptions));
  }

  createAdmin(pAdmin: Admin) {
    return firstValueFrom(this.httpClient.post<Admin>(this.baseUrl, pAdmin, this.loginTokenService.getTokenHeader()));
  }

  updateAdminById(pId: number, newData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${pId}`, newData, httpOptions));
  }

  validateTeacherById(pId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/validate/${pId}`, { isApproved: 1 }, httpOptions));
  }

  deactiveStudentById(pId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/deactive/${pId}`, { isActive: 0 }, httpOptions));
  }

  deleteAdminById(pId: number) {
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/delete/${pId}`, this.loginTokenService.getTokenHeader()));
  }

  deleteaAllAdmin() {
    return firstValueFrom(this.httpClient.delete<any>(this.baseUrl, this.loginTokenService.getTokenHeader()));
  }


}
