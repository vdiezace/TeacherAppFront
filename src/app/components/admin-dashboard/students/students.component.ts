import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {


  students = [
    { nombre: 'Juan', apellidos: 'Pérez',email:'juan@gmail.com', numero:650650650, ubicacion: 'Madrid', edad: 20 },
    { nombre: 'María', apellidos: 'López', email:'Maria@gmail.com',  numero:650650651, ubicacion: 'Barcelona', edad: 22 },
    { nombre: 'Pedro', apellidos: 'Gómez', email:'Pedro@gmail.com',  numero:650650652, ubicacion: 'Valencia', edad: 19 },];

  public userData : any;

  constructor( private studentsservice: StudentsService) {
  }

  async ngOnInit() {
    const response = await this.studentsservice.getAllStudents();
    console.log(response);
    this.userData= response;
    if (this.userData){
    console.log(this.userData.name);
    }
  }

}
