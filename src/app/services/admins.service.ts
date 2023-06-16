import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginTokenService } from './login-token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  baseUrl: string = "http://localhost:3000/api/admin";
  constructor(
    private httpClient: HttpClient,
    private loginTokenService: LoginTokenService
  ) { }
}
