import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/users';
    this.apiUrl = "http://localhost:3000/api/users";
  }

  login(values: { email: string, password: string }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, values)
    )
  }

  findByEmail(pEmail: string) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${pEmail}`))
  }

  getByEmail(pEmail: string) {
    return firstValueFrom(this.httpClient.get<any>(`${this.apiUrl}/${pEmail}`))
  }

  getAllUser() {
    return firstValueFrom(this.httpClient.get<any>(this.apiUrl))
  }

  getById(pId: number) {
    return firstValueFrom(this.httpClient.get<any>(`${this.apiUrl}/${pId}`))
  }

  saveLocation(pUser: User, pLocation: any): Promise<any> {
    return firstValueFrom(this.httpClient.put<any>(`${this.apiUrl}/location/${pUser.users_id}`, pLocation));
  }

  isLogged(): boolean {
    return localStorage.getItem("token") ? true : false;
  }
}
