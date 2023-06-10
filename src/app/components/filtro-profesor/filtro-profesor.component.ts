import { Component } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';


@Component({
  selector: 'app-filtro-profesor',
  templateUrl: './filtro-profesor.component.html',
  styleUrls: ['./filtro-profesor.component.css']
})
export class FiltroProfesorComponent {
  filtroEspecialidad = '';
  profesor: any ;

  constructor (private profesorService: ProfesorService){}
  filtrarProfesores() {
    this.profesorService.getProfesores(this.filtroEspecialidad)
}
}