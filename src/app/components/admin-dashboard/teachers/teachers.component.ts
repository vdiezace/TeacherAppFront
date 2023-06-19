import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponentAdmin {

  teachers :any = [] 
  currentIndex: number = 0;

 /* teachers = [
    { first_name: 'Juan', last_name: 'Pérez',email:'juan@gmail.com', phone:650650650, address: 'Madrid' },
    { first_name: 'María', last_name: 'López', email:'Maria@gmail.com',  phone:650650651, address: 'Barcelona'},
    { first_name: 'Pedro', last_name: 'Gómez', email:'Pedro@gmail.com',  phone:650650652, address: 'Valencia' },];
*/
  constructor(private teacherService: TeachersService) {
    
  }

  async ngOnInit() {
    this.teachers = await this.teacherService.getAllTeachers();
    
  }


}
