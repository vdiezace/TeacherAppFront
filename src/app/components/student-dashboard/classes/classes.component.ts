import { Component } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {

  classes: any[];

  constructor( private classesService: ClassesService) {
    this.classes = [];
  }

  async ngOnInit() {
    const response = await this.classesService.getLoggedStudentClasses();
    console.log(response);
    this.classes = response;
  }

}
