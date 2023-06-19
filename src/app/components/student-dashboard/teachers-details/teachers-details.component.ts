import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { ClassesService } from 'src/app/services/classes.service';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers-details',
  templateUrl: './teachers-details.component.html',
  styleUrls: ['./teachers-details.component.css']
})
export class TeachersDetailsComponent {

  startHour = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00"
  ]

  endHour = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
    
  ]

  date: string;

  startHourSelected: number;
  endHourSelected: number;

  teacherId = 0;
  teacher: Teacher | undefined;

  constructor( private classesService: ClassesService,
    private loginTokenService: LoginTokenService,
    private teacherService: TeachersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.date = "";
    this.startHourSelected = 0;
    this.endHourSelected = 0;
    
  }


  async onClick() {
    try {
      const response = await this.classesService.create({
        start_hour: +this.startHourSelected,
        end_hour: +this.endHourSelected,
        start_date: this.date,
        teachers_id: this.teacherId ,
        students_id: this.loginTokenService.getId(),
        cancel_date: ""
       });
       console.log(response);   
       if(response) {
        this.router.navigate(["student/home"]).then(()=>{
          Swal.fire({
            title: 'Done!',
            text: 'Your class has been booked',
            icon: 'success',
            timer: 3000
          });
        })
       }
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }

  async ngOnInit() {
    this.teacherId = +this.activatedRoute.snapshot.paramMap.get("teacherid")!;
    this.teacher = await this.teacherService.getTeacherById(this.teacherId);
    console.log(this.teacher);
  }

}
