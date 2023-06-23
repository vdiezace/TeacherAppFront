import { Component, inject } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentAdmin {

  studentsService = inject( StudentsService )
  diactiveStudents = [];

  async ngOnInit() {
    this.diactiveStudents = await this.studentsService.getStudentDiactiveStatus();
  }
}
