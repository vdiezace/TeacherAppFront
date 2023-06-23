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

  constructor( private studentsService: StudentsService) {
  }

  async ngOnInit() {
    this.students = await this.studentsService.getAllStudents();
  }

  async approve(pStudentId: number) {
    try {
      const response = await this.studentsService.activateStudent(pStudentId);
      console.log(response);
      if(!response.fatal) {
        this.students = await this.studentsService.getAllStudents();
      }  
    }
    catch(error) {
      console.log(error)
    }
  }

}
