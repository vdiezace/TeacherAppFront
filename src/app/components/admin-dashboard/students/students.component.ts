import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

students:any=[];
  /*students = [
    { first_name: 'Juan', last_name: 'Pérez',email:'juan@gmail.com', phone:650650650, address: 'Madrid' },
    { first_name: 'María', last_name: 'López', email:'Maria@gmail.com',  phone:650650651, address: 'Barcelona'},
    { first_name: 'Pedro', last_name: 'Gómez', email:'Pedro@gmail.com',  phone:650650652, address: 'Valencia' },];
*/
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
