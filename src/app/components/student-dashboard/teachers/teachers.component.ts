import { Component } from '@angular/core';
import { TeachersService } from './teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {

  teachers: any[];
  myTeachers: any[];
  myClasses: any[];

  constructor(private teacherService: TeachersService) {
    this.teachers = [];
    this.myTeachers = [];
    this.myClasses = [];
  }

   async ngOnInit() {
    this.teachers = await this.teacherService.getAllTeachers();
    
    console.log(this.teachers);
    
    const response = await this.teacherService.getTeachersByStudentId();
    this.myClasses = response;
    console.log(response);

    this.myTeachers = this.teachers.filter((teacher) => {
      return this.myClasses.some((cl) => {
        return cl.teachers_id === teacher.teacher_id;
      });
    });
    console.log(this.myTeachers);
  }


}
