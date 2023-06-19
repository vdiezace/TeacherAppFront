import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClassesService } from 'src/app/services/classes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {

  classes: any[];

  constructor(private classesService: ClassesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.classes = [];
  }

  async ngOnInit() {

    const response = await this.classesService.getLoggedStudentClasses();
    console.log(response);
    this.classes = response;
  }


  async deleteClass(pClassId: number) {
    try {
      const response = await this.classesService.deleteClassById(pClassId);
      if (response.id) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["student/classes"]).then(() => {
            Swal.fire({
              title: 'Canceled!',
              text: 'Your class has been canceled.',
              icon: 'success',
              timer: 3000
            });
          })
        );
      }  
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      });
    }
  }

  cancelar(pClassId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.deleteClass(pClassId);
      }
    });
  }
}
