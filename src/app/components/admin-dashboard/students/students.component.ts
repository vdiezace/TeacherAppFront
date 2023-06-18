import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {


  students = [
    { nombre: 'Juan', apellidos: 'Pérez', ubicacion: 'Madrid', edad: 20 },
    { nombre: 'María', apellidos: 'López', ubicacion: 'Barcelona', edad: 22 },
    { nombre: 'Pedro', apellidos: 'Gómez', ubicacion: 'Valencia', edad: 19 },];

  public userData : any;

  constructor( private studentsservice: StudentService) {
  }

  async ngOnInit() {
    const response = await this.studentsservice.getSutdentsData();
    console.log(response);
    this.userData= response;
    if (this.userData){
    console.log(this.userData.name);
    }
  }

}
