import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css']
})
export class TeacherClassesComponent implements OnInit {
 
    bookedClasses: any[] = [];
    teacherData: any;
    studentsData: Map<number, any> = new Map<number, any>();
  
    constructor(
      private classesService: ClassesService,
      private loginTokenService: LoginTokenService,
      private teachersService: TeachersService,
      private studentsService: StudentsService
    ) {}
  
    ngOnInit() {
      this.getBookedClasses();
      this.getTeacherById(this.loginTokenService.getId());
    }
  
    async getBookedClasses() {
      try {
        const response = await this.classesService.getTeacherClasses(
          this.loginTokenService.getId()
        );
        console.log(response); // Verifica la estructura y tipo de respuesta
        if (Array.isArray(response)) {
          this.bookedClasses = response;
          await this.loadStudentsData();
        } else {
          this.bookedClasses = [];
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    async loadStudentsData() {
      for (let bookedClass of this.bookedClasses) {
        if (!this.studentsData.has(bookedClass.students_id)) {
          try {
            const studentData = await this.studentsService.getStudentById(
              bookedClass.students_id
            );
            console.log(studentData); // Verifica la estructura y tipo de respuesta
            if (typeof studentData === 'object' && studentData !== null) {
              this.studentsData.set(bookedClass.students_id, studentData);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  
    getStudentName(studentId: number): string {
      const studentData = this.studentsData.get(studentId);
      if (studentData) {
        return `${studentData.first_name} ${studentData.last_name}`;
      }
      return '';
    }
  
    async getTeacherById(teacherId: number) {
      try {
        const response = await this.teachersService.getTeacherById(teacherId);
        console.log(response); // Verifica la estructura y tipo de respuesta
        if (typeof response === 'object' && response !== null) {
          this.teacherData = response;
        } else {
          this.teacherData = {};
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
 
 
 
 
 
 
  /* bookedClasses: any[] = [];
  teacherData: any;
  studentsData: Map<number, any> = new Map<number, any>();
  

  constructor(
    private classesService: ClassesService,
    private loginTokenService: LoginTokenService,
    private teachersService: TeachersService,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    this.getBookedClasses();
    this.getTeacherById(this.loginTokenService.getId());
    
  }

  async getBookedClasses() {
    try {
      const response = await this.classesService.getTeacherClasses(
        this.loginTokenService.getId()
      );
      console.log(response); // Verifica la estructura y tipo de respuesta
      if (Array.isArray(response)) {
        this.bookedClasses = response;
        await this.loadStudentsData();
      } else {
        this.bookedClasses = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  async loadStudentsData() {
    for (let bookedClass of this.bookedClasses) {
      if (!this.studentsData.has(bookedClass.students_id)) {
        try {
          const studentData = await this.studentsService.getStudentById(
            bookedClass.students_id
          );
          console.log(studentData); // Verifica la estructura y tipo de respuesta
          if (typeof studentData === 'object' && studentData !== null) {
            this.studentsData.set(bookedClass.students_id, studentData);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  getStudentName(studentId: number): string {
    const studentData = this.studentsData.get(studentId);
    if (studentData) {
      return `${studentData.first_name} ${studentData.last_name}`;
    }
    return '';
  }

  async getTeacherById(teacherId: number) {
    try {
      const response = await this.teachersService.getTeacherById(teacherId);
      console.log(response); // Verifica la estructura y tipo de respuesta
      if (typeof response === 'object' && response !== null) {
        this.teacherData = response;
      } else {
        this.teacherData = {};
      }
    } catch (error) {
      console.log(error);
    }
  }*/

