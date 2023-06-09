import { HttpClient } from '@angular/common/http';
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
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${pId}`, this.loginTokenService.getTokenHeader()));
  }

  createAdmin(pAdmin: Admin) {
    return firstValueFrom(this.httpClient.post<Admin>(this.baseUrl, pAdmin, this.loginTokenService.getTokenHeader()));
  }

  updateAdminById(pId: number) {
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${pId}`, this.loginTokenService.getTokenHeader()));
  }

  validateTeacherById(pId: number) {
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/validate/${pId}`, this.loginTokenService.getTokenHeader()));
  }

  deleteAdminById(pId: number) {
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/delete/${pId}`, this.loginTokenService.getTokenHeader()));
  }

  deleteaAllAdmin() {
    return firstValueFrom(this.httpClient.delete<any>(this.baseUrl, this.loginTokenService.getTokenHeader()));
  }


}
