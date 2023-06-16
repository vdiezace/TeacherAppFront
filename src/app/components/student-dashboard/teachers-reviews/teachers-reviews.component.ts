import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { TeachersService } from '../teachers/teachers.service';
import { TeachersReviewsService } from './teachers-reviews.service';
import { parse } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-teachers-reviews',
  templateUrl: './teachers-reviews.component.html',
  styleUrls: ['./teachers-reviews.component.scss']
})
export class TeachersReviewsComponent {

  value1 = 0;
  value2 = 0;
  value3 = 0;
  value4 = 0;
  comment: string = "";

  teacherId:any= 0;
  teacherData: any;

  constructor(private teachersReviewsService: TeachersReviewsService ,
    private activatedRoute: ActivatedRoute) {

  }

/*   async ngOnInit() {
    this.teacherId= this.activatedRoute.snapshot.paramMap.get("teacherid");

    this.teacherData= await this.teachersReviewsService.getTeacherById(this.teacherId);
    console.log(this.teacherData);
  }

  onSubmit(formulario: any) {
    console.log(formulario.value);
    console.log(this.value1, this.value2, this.value3, this.value4);
    const avg = (+this.value1 + +this.value2 + +this.value3 + +this.value4)/4;
    console.log(avg);
    
    this.teachersReviewsService.reviewTeacher(this.teacherId, avg, this.comment);
  }
 */
}
