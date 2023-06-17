import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';


@Component({
  selector: 'app-teacher-filter',
  templateUrl: './teacher-filter.component.html',
  styleUrls: ['./teacher-filter.component.css']
})
export class TeacherFilterComponent implements OnInit {

  teachers: Teacher [];
  selectedValue: any;

  ChangeAVG_Rating(e: Event) {
    this.selectedValue = (e.target as HTMLInputElement).value;
  }
  
 
 
  constructor(private teacherService: TeachersService) {
    this.teachers = [];

  }

 

  getTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  async ngOnInit() {
    const teachers = await this.teacherService.getAllTeachers().toPromise();
    this.teachers = teachers ? teachers : [];
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

  get uniqueTeachersProvince(): Teacher[] {
    const uniqueValues: Teacher[] = [];

    this.teachers.forEach((teacher) => {
      const isValueAlreadyCaptured = uniqueValues.some(
        (uniqueTeacher) => uniqueTeacher.province === teacher.province
      );

      if (!isValueAlreadyCaptured) {
        uniqueValues.push(teacher);
      }
    });

    return uniqueValues;
  }
}
 







