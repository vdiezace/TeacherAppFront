import { LoginTokenService } from 'src/app/services/login-token.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { TeachersService } from 'src/app/services/teachers.service';
import { ReviewsService } from 'src/app/services/reviews.service';

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

  isEdition= false;
  editionId= 0;

  constructor(private teachersService: TeachersService,
    private loginTokenService: LoginTokenService,
    private reviewsService: ReviewsService,
    private activatedRoute: ActivatedRoute) {

  }

   async ngOnInit() {
    this.teacherId= +this.activatedRoute.snapshot.paramMap.get("teacherid")!;

    const response= await this.reviewsService.getReviewByTeacherIdAndStudentId(this.teacherId, this.loginTokenService.getId());
    if (response.id){
      this.isEdition= true;
      this.comment= response.comment;
      this.editionId= response.id;
    }

    this.teacherData= await this.teachersService.getTeacherById(this.teacherId);
    console.log(this.teacherData);
  }

  onSubmit(formulario: any) {
    console.log(formulario.value);
    console.log(this.value1, this.value2, this.value3, this.value4);
    const avg = (+this.value1 + +this.value2 + +this.value3 + +this.value4)/4;
    console.log(avg);
    
    if (this.isEdition){
      this.reviewsService.updateReview(this.editionId, {
        teachers_id: this.teacherId,
        students_id: this.loginTokenService.getId(), 
        rating: avg,
        comment: this.comment
      })
    } else {
      this.reviewsService.create({
      teachers_id: this.teacherId,
      students_id: this.loginTokenService.getId(), 
      rating: avg,
      comment: this.comment
    });
  }
  }
 
}
