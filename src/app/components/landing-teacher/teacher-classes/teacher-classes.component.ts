import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { LoginTokenService } from 'src/app/services/login-token.service';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css']
})
export class TeacherClassesComponent {
  bookedClasses: any[] = [];
  currentDate = new Date();
  formattedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy') ?? '';
  
  constructor(private classesService: ClassesService,
    private loginTokenService: LoginTokenService,
    private datePipe: DatePipe) { }

  
  ngOnInit() {
    this.getBookedClasses();
}

async getBookedClasses() {
  try {
    const response = await this.classesService.getBookedClassesByTeacherAndDate(
      this.loginTokenService.getId(),
      this.formattedDate
    );
    this.bookedClasses = response;
  } catch (error) {
    console.log(error);
  }
}}
