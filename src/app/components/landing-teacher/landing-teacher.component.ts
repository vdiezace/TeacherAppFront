import { Component } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-landing-teacher',
  templateUrl: './landing-teacher.component.html',
  styleUrls: ['./landing-teacher.component.css']
})
export class LandingTeacherComponent {
  teacher: any;
  reviews: any;
  hasError: boolean = false;
  public teacherData : any ;
 
  

constructor(private teachersService: TeachersService,
  private reviewsService: ReviewsService,
  private loginTokenService: LoginTokenService) {
  this.teacher = [];
  
 

}
ngOnInit() {
  this.getTeacherById(this.loginTokenService.getId());
}

async getTeacherById(teacherId: number) {
  try {
    const response = await this.teachersService.getTeacherById(teacherId);
    this.teacher = response;
    this.teacherData = this.teacher;
  } catch (error) {
    console.log(error);
  }
}
}

/*async ngOnInit() {
  const response = await this.teachersService.getTeacherById(this.loginTokenService.getId());
  console.log(response);
  this.teacherData= response;
  if (this.teacherData){
  console.log(this.teacherData.avg_rating);
  }
}

async ngOnInit() {
  try {
    const response = await this.reviewsService.getReviewsByTeacherId(this.loginTokenService.getId());
    this.reviews = response;
    console.log(this.reviews);  
  } catch (error) {
    console.log(error);
    this.hasError = true;
  }
}
*/



/*async ngOnInit() {
  try {
    const response = await this.reviewsService.getReviewsByTeacherId(this.loginTokenService.getId());
    console.log(response);  
  }catch(err) {
    return err;
  }
}

async getTeacherById(teacherId: number) {
  try {
    const response = await this.teachersService.getTeacherById(teacherId);
    this.teacher = response;
  } catch (error) {
    console.log(error);
  }
}*/




