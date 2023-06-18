import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/interfaces/student.interface';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';




@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent {
  students: Student[];
  myStudents: any[];
  myClasses: any[];

  constructor(private studentService: StudentsService) {
    this.students = [];
    this.myStudents = [];
    this.myClasses = [];
  }

  async ngOnInit() {
    const response: any = await this.studentService.getAllStudents();
    if (response.success) {
      this.students = response.data;
      console.log(this.students);
    } else {
      console.error('Error fetching students:', response.error);
    }
  }

    
   /*  const response = await this.teacherService.getTeachersByStudentId();
    this.myClasses = response;
    console.log(response); */

   // this.myTeachers = this.teachers.filter((teacher) => {
   //   return this.myClasses.some((cl) => {
   //     return cl.teachers_id === teacher.teacher_id;
   //   });
   // });
   // console.log(this.myStudents);
  }