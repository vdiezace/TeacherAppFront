import { LoginTokenService } from 'src/app/services/login-token.service';
import { Component } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {

  teachers: Teacher[];
  myTeachers: any[];
  myClasses: any[];

  constructor(private teacherService: TeachersService,
    private loginTokenService: LoginTokenService,
    private classesService: ClassesService) {
    this.teachers = [];
    this.myTeachers = [];
    this.myClasses = [];
  }

  async ngOnInit() {
    this.teachers = await this.teacherService.getAllTeachers();

    this.myClasses = await this.classesService.getStudentClasses(this.loginTokenService.getId());


    this.myTeachers = this.teachers.filter((teacher) => {
      return this.myClasses.some((cl) => {
        return cl.teachers_id === teacher.teacher_id;
      });
    });

  }


}
