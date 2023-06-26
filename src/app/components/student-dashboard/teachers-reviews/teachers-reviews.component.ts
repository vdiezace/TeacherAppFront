import { LoginTokenService } from 'src/app/services/login-token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { TeachersService } from 'src/app/services/teachers.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import Swal from 'sweetalert2';

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

  teacherId: any = 0;
  teacherData: any;

  isEdition = false;
  editionId = 0;

  constructor(private teachersService: TeachersService,
    private loginTokenService: LoginTokenService,
    private reviewsService: ReviewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  async ngOnInit() {
    this.teacherId = +this.activatedRoute.snapshot.paramMap.get("teacherid")!;

    const [response] = await this.reviewsService.getReviewByTeacherIdAndStudentId(this.teacherId, this.loginTokenService.getId());
    if (response.id) {
      this.isEdition = true;
      this.comment = response.comment;
      this.editionId = response.id;
    }

    this.teacherData = await this.teachersService.getTeacherById(this.teacherId);
  }

  async onSubmit(formulario: any) {

    try {
      const avg = (+this.value1 + +this.value2 + +this.value3 + +this.value4) / 4;


      if (this.isEdition) {
        const responseUpdate = await this.reviewsService.updateReview(this.editionId, {
          teachers_id: this.teacherId,
          students_id: this.loginTokenService.getId(),
          rating: avg,
          comment: this.comment
        })
        if (responseUpdate) {
          this.router.navigate(["student/reviews"]).then(() => {
            Swal.fire({
              title: 'Done!',
              text: 'Your review has been updated!',
              icon: 'success',
              timer: 3000
            });
          })
        }
      } else {
        const responseCreate = await this.reviewsService.create({
          teachers_id: this.teacherId,
          students_id: this.loginTokenService.getId(),
          rating: avg,
          comment: this.comment
        });
        if (responseCreate) {
          this.router.navigate(["student/teachers"]).then(() => {
            Swal.fire({
              title: 'Done!',
              text: 'Your review has been sent successfully!',
              icon: 'success',
              timer: 3000
            });
          })
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

}
