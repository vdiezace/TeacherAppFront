import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginTokenService {
  private baseUrl: string;
  private _logged = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/users/login";
  }

  loggedIn() {
    this._logged.next(true);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user-token')
    this._logged.next(false);
  }

  getId() {
    const token = localStorage.getItem('user-token');
    if (!token) {
      alert("No existe el token");
      return false;
    }
    const tokenInfo = this.getDecodedAccessToken(token);
    return tokenInfo.user_id;
  }

  getRole() {
    const token = localStorage.getItem('user-token');
    if (!token) {
      alert("No existe el token");
      return false;
    }
    const tokenInfo = this.getDecodedAccessToken(token);
    return tokenInfo.user_role;
  }
}

