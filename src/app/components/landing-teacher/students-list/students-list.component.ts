import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Student } from 'src/app/interfaces/student.interface';
import { ClassesService } from 'src/app/services/classes.service';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[];
  myStudents: any[];
  myClasses: any[];

  constructor(
    private classesService: ClassesService,
    private loginTokenService: LoginTokenService,
    private teachersService: TeachersService,
    private studentsService: StudentsService
  ) {
    this.students = [];
    this.myStudents = [];
    this.myClasses = [];
  }

  async ngOnInit() {
    this.students = await this.studentsService.getAllStudents();

    this.myClasses = await this.classesService.getTeacherClasses(this.loginTokenService.getId());

    this.myStudents = this.students.filter((student) => {
      return this.myClasses.some((cl) => {
        return cl.students_id === student.id;
      });
    });
  }
}
