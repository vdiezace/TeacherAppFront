import { Component } from '@angular/core';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher-filter',
  templateUrl: './teacher-filter.component.html',
  styleUrls: ['./teacher-filter.component.css']
})
export class TeacherFilterComponent {

  teachers: any[];
  currentIndex: number = 0;

  constructor(private teacherService: TeacherService) {
    this.teachers = [];
  }

  async ngOnInit (){
    this.teachers = await this.teacherService.getAll();
    
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


