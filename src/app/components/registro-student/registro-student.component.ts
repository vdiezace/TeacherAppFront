import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { LocationsService } from 'src/app/services/locations.service';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registro-student',
  templateUrl: './registro-student.component.html',
  styleUrls: ['./registro-student.component.css']
})
export class RegistroStudentComponent implements OnInit {

  studentForm: FormGroup;
  student_role_id = 3;
  city: City[] = [];
  province: Province[] = [];
  citiesByProvince: City[] = [];
  userLatitude: number | undefined = undefined;
  userLongitude: number | undefined = undefined;
  action: string = "Registrar";

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private locationsService: LocationsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.studentForm = new FormGroup({
      role_id: new FormControl(this.student_role_id, []),
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      username: new FormControl("", []),
      email: new FormControl("", []),
      password: new FormControl("", []),
      repitePassword: new FormControl("", []),
      phone: new FormControl("", []),
      address: new FormControl("", []),
      avatar: new FormControl("", []),
      province_id: new FormControl("", []),
      city_id: new FormControl("", [])
    }, [])
  }

  async ngOnInit(): Promise<void> {
    try {
      this.province = await this.locationsService.getAllProvinces();
      this.city = await this.locationsService.getAllCities();
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.userLatitude = latitude,
          this.userLongitude = longitude
      })
      this.activatedRoute.params.subscribe(async (params: any) => {
        //console.log(params.teacherId);
        let id = parseInt(params.teacherId)
        if (id) {
          this.action = "Actualizar";
          const response = this.usersService.getById(id);
        }
        this.studentForm = new FormGroup({
          id: new FormControl(id, []),
          role_id: new FormControl(this.student_role_id, []),
          first_name: new FormControl("", []),
          last_name: new FormControl("", []),
          username: new FormControl("", []),
          email: new FormControl("", []),
          password: new FormControl("", []),
          repitePassword: new FormControl("", []),
          phone: new FormControl("", []),
          address: new FormControl("", []),
          avatar: new FormControl("", []),
          province_id: new FormControl("", []),
          city_id: new FormControl("", [])
        }, [])
      })
    } catch (error) {
      console.log(error)
    }
  }

  getDataForm() {
    console.log(this.studentForm.value)
  }

  onSelected(e: any) {
    try {
      this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(e.target.value))
    } catch (error) {
      console.log(error)
    }
  }
}

