import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/locations';
  }
  getAllLocations() {
    return firstValueFrom(this.httpClient.get<any>(this.baseUrl));
  }

  getAllProvinces() {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/province`))
  }

  getAllCities() {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/city`))
  }

  getCitiesByProvince(pProvince: number) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/province/city/${pProvince}`))
  }

  create(newLocation: Location) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    }
    return firstValueFrom(this.httpClient.post<Location>(this.baseUrl, newLocation, httpOptions))
  }
}
