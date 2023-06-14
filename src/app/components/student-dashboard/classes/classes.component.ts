import { Component } from '@angular/core';
import { ClassesService } from './classes.service';

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
    const response = await this.classesService.getStudentClasses();
    this.classes = response;
    console.log(response);
  }

}
