import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponentAdmin {

  teachers: any[] = []

  currentIndex: number = 0;
  teacherId: number;

  thisPage = 0;
  resultsPerPage = 10;
  numberOfPages = 0;

  constructor(private teacherService: TeachersService,
    private adminService: AdminsService,
    private activatedRoute: ActivatedRoute) {

    this.teacherId = 0;
  }

  nextPage() {
    if (this.thisPage + 1 < this.teachers.length / this.resultsPerPage) {
      this.thisPage++;
    }
  }

  previousPage() {
    if (this.thisPage !== 0) {
      this.thisPage--;
    }
  }

  async ngOnInit() {
    this.teachers = await this.teacherService.getAllTeachers();
    this.numberOfPages = Math.floor(this.teachers.length / this.resultsPerPage);

  }

  async approve(pTeacherId: number) {
    const response = await this.adminService.validateTeacherById(pTeacherId);
    if (!response.fatal) {
      this.teachers = await this.teacherService.getAllTeachers();
    }
  }
}
