import { LatLngLiteral } from '@agm/core';
import { Component } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  teachers: any[];
  locations: LatLngLiteral[];

  constructor(private teacherService: TeachersService) {
    this.teachers = [];
    this.locations = [];
  }

  async ngOnInit() {
    /*     this.teacherService.getAllTeachers().subscribe((teachers: TeachersService[]) => {
          this.teachers = teachers;
      
          this.locations = this.teachers.map(teacher => ({
            lat: teacher.latitude,
            lng: teacher.longitude
          }));
        }); */
  }


}

