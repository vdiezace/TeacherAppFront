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

  teachers :any = [] 
  currentIndex: number = 0;
  teacherId: number;

  constructor(private teacherService: TeachersService,
    private adminService: AdminsService,
    private activatedRoute: ActivatedRoute) {

    this.teacherId = 0;
  }

  async ngOnInit() {
    this.teachers = await this.teacherService.getAllTeachers();
    console.log(this.teachers);
    
  }

  async approve(pTeacherId: number) {
    const response = await this.adminService.validateTeacherById(pTeacherId);
    console.log(response)
    if(!response.fatal) {
      this.teachers = await this.teacherService.getAllTeachers();
    }
  }
}
