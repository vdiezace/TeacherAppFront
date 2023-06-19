import { LatLngLiteral } from '@agm/core';
import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-new-map',
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.css']
})
export class NewMapComponent {
 /* teachers: any[];
  locations: LatLngLiteral[];

  constructor(private teacherService: TeachersService) {
    this.teachers = [];
    this.locations = [];
  }

  ngOnInit() {
    this.teacherService.getAllTeachers().then((teachers: any[]) => {
      this.teachers = teachers;

      this.locations = this.teachers.map(teacher => ({
        lat: parseFloat(teacher.latitude),
        lng: parseFloat(teacher.longitude)
      }));

      console.log(this.locations);
    }).catch(error => {
      console.log(error);
    });
  }*/
}