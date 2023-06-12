import { Component } from '@angular/core';
import { TeachersService } from './teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {

  teachers: any[];

  constructor(private teacherService: TeachersService) {
    this.teachers = [];
  }

  async ngOnInit() {
    this.teachers = await this.teacherService.getAllTeachers();
    console.log(this.teachers);
  }

}
