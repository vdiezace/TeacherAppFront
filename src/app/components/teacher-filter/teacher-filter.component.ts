import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher-filter',
  templateUrl: './teacher-filter.component.html',
  styleUrls: ['./teacher-filter.component.css']
})
export class TeacherFilterComponent implements OnInit {

  teachers: Teacher [];
 
 
  constructor(private teacherService: TeacherService) {
    this.teachers = [];

  }

 

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  async ngOnInit (){
    this.teachers = await this.teacherService.getAll();
    this.getTeachers();
    
  }

  get uniqueTeachers(): Teacher[] {
    const uniqueValues: Teacher[] = [];

    this.teachers.forEach((teacher) => {
      const isValueAlreadyCaptured = uniqueValues.some(
        (uniqueTeacher) => uniqueTeacher.experience === teacher.experience
      );

      if (!isValueAlreadyCaptured) {
        uniqueValues.push(teacher);
      }
    });

    return uniqueValues;
  }


  get uniqueTeachersRating(): Teacher[] {
    const uniqueValues: Teacher[] = [];

    this.teachers.forEach((teacher) => {
      const isValueAlreadyCaptured = uniqueValues.some(
        (uniqueTeacher) => uniqueTeacher.avg_rating === teacher.avg_rating
      );

      if (!isValueAlreadyCaptured) {
        uniqueValues.push(teacher);
      }
    });

    return uniqueValues;
  }
}
 







