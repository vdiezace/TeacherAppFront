import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/categories"
  }

  getAllCategories() {
    return firstValueFrom(this.httpClient.get<any>(this.baseUrl))
  }
}
