import { Component, inject } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentAdmin {

  studentsService = inject(StudentsService);
  teachersService = inject(TeachersService);
  diactiveStudents = [];
  diactiveTeachers = [];

  async ngOnInit() {
    this.diactiveStudents = await this.studentsService.getStudentDiactiveStatus();
    this.diactiveTeachers = await this.teachersService.getDeactiveTeachers();
  }
}
