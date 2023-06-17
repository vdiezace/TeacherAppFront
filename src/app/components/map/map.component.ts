import { LatLngLiteral } from '@agm/core';
import { Component } from '@angular/core';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  teachers: any[];
  locations: LatLngLiteral[];

  constructor(private teacherService: TeacherService) {
    this.teachers = [];
    this.locations = [];
  }

  async ngOnInit (){
    this.teachers = await this.teacherService.getAll();

    this.locations = this.teachers.map( teacher => ({
      lat: teacher.latitude,
      lng: teacher.longitude
    }));
    
  }

}

