import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:3000/profesores';

  constructor(private http: HttpClient) { }

  getProfesores(especialidad: string): Observable<any[]> {
    const params = { especialidad };
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}


