import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponentAdmin {

  teachers: any[];
  currentIndex: number = 0;

  constructor(private teacherService: TeachersService) {
    this.teachers = [];
  }

  async ngOnInit (){
    this.teachers = await this.teacherService.getAllTeachers();
    
  }

  previousPage() {
    if (this.currentIndex >= 3) {
      this.currentIndex -= 3;
    }
  }

  nextPage() {
    if (this.currentIndex + 3 < this.teachers.length) {
      this.currentIndex += 3;
    }
  }
}
