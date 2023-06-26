import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminsService } from 'src/app/services/admins.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  students: any[] = [];

  thisPage = 0;
  resultsPerPage = 10;
  numberOfPages = 0;

  constructor(
    private studentsService: StudentsService,
    private adminService: AdminsService
  ) {
  }

  nextPage() {
    if (this.thisPage + 1 < this.students.length / this.resultsPerPage) {
      this.thisPage++;
    }
  }

  previousPage() {
    if (this.thisPage !== 0) {
      this.thisPage--;
    }
  }

  async ngOnInit() {
    this.students = await this.studentsService.getAllStudents();
    this.numberOfPages = Math.floor(this.students.length / this.resultsPerPage);
  }

  async deactive(pStudentId: number) {
    try {
      const response = await this.adminService.deactiveStudentById(pStudentId);
      if (!response.fatal) {
        this.students = await this.studentsService.getAllStudents();
      }
    }
    catch (error) {
      console.log(error)
    }
  }

}
