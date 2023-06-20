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
  // action: string = "Registrar";
  title: string = "register"
  studentId: number;
  isEdition = false;
  /* 
    studentId: any; */

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private locationsService: LocationsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.studentId = 0;
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
        this.studentId = parseInt(params.studentid)
        if (this.studentId) {
          console.log("id", this.studentId);
          this.isEdition = true; this.loadUserData();
        }

      })
    } catch (error) {
      console.log(error)
    }
  }

  getDataForm() {
    console.log(this.studentForm.value)
  }

  async loadUserData() {
    const response = await this.studentsService.getStudentById(this.studentId);
    const response1 = await this.usersService.getById(response.user_id);
    //console.log(response);
    if (response.user_id) {
      // console.log(response);
      // console.log(response1);
      this.title = "update";
      let provinceSelected = 0;
      this.province.forEach(
        province => {
          if (province.name == response.province) {
            provinceSelected = province.id;
          }
        }
      )

      let citySelected = 0;
      this.city.forEach(
        city => {
          if (city.name == response.city) {
            citySelected = city.id;
          }
        }
      )

      this.studentForm = new FormGroup({
        users_id: new FormControl(response.user_id, []),
        role_id: new FormControl(response1.role_id, []),
        first_name: new FormControl(response.first_name, []),
        last_name: new FormControl(response.last_name, []),
        username: new FormControl(response.username, []),
        email: new FormControl(response.email, []),
        password: new FormControl(response.password, []),
        repitePassword: new FormControl(response.password, []),
        phone: new FormControl(response.phone, []),
        address: new FormControl(response.address, []),
        avatar: new FormControl(response.avatar, []),
        province_id: new FormControl(provinceSelected, []),
        city_id: new FormControl(citySelected, [])
      }, [])

    }
  }

  onSelected(e: any) {
    try {
      this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(e.target.value))
    } catch (error) {
      console.log(error)
    }
  }

  onSubmit() {
    if (!this.isEdition) {
      this.studentsService.createNewStudent(this.studentForm.value);
    } else {
      this.studentsService.updateStudent(this.studentId, this.studentForm.value);
    }
  }
}

