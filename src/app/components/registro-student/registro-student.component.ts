import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { LocationsService } from 'src/app/services/locations.service';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
  title: string = "register"
  action: string = "Register"
  isEdition = false;
  usersService = inject(UsersService)
  studentStored: any;

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private locationsService: LocationsService,
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

    this.province = await this.locationsService.getAllProvinces();
    this.city = await this.locationsService.getAllCities();
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.userLatitude = latitude,
        this.userLongitude = longitude
    })

    this.activatedRoute.params.subscribe(async (params: any) => {
      console.log(params);
      let id = parseInt(params.studentid)
      if (id) {
        this.title = "update";
        this.action = "Update"
        this.studentStored = await this.studentsService.getStudentById(id);
        this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(this.studentStored.province_id));

        this.studentForm = new FormGroup({
          user_id: new FormControl(this.studentStored.user_id, []),
          role_id: new FormControl(this.student_role_id, []),
          first_name: new FormControl(this.studentStored.first_name, []),
          last_name: new FormControl(this.studentStored.last_name, []),
          username: new FormControl(this.studentStored.username, []),
          email: new FormControl(this.studentStored.email, []),
          password: new FormControl(this.studentStored.password, []),
          repitePassword: new FormControl(this.studentStored.password, []),
          phone: new FormControl(this.studentStored.phone, []),
          address: new FormControl(this.studentStored.address, []),
          avatar: new FormControl(this.studentStored.avatar, []),
          province_id: new FormControl(this.studentStored.province_id, []),
          city_id: new FormControl(this.studentStored.city_id, [])
        }, [])
      }
    })
  }

  async getDataForm(): Promise<void> {
    console.log(this.studentForm.value)
    let student = this.studentForm.value;
    //console.log(student.user_id)
    if (student.user_id) {
      try {
        /** Actualizamos */
        let response = await this.studentsService.updateStudent(student);
        console.log(response)
        if (response.users_id) {
          Swal.fire({
            icon: 'success',
            title: `The student ${response.first_name} ${response.last_name} has been successfully updated.`
          })
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops! There seems to have been an error.',
            text: "Try again"
          });
        }
      } catch (error) {
        console.log(error)
      }

    } else {
      /** Registrando un nuevo estudiante */
      try {
        let response = await this.studentsService.createNewStudent(student);
        //console.log(response);
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: `The student ${response.first_name} ${response.last_name} has been successfully created.`
          });
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops! There seems to have been an error.',
            text: "Try again"
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  onSelected(e: any) {
    try {
      this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(e.target.value))
    } catch (error) {
      console.log(error)
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.studentForm.get(pControlName)?.hasError(pError) && this.studentForm.get(pControlName)?.touched) {
      return true
    }
    return false;
  }

  checkPassword(pFormValue: AbstractControl) {
    const password: string = pFormValue.get('password')?.value;
    const repitepassword: string = pFormValue.get('repitepassword')?.value;

    if (password !== repitepassword) {
      return { 'checkpassword': true }
    }
    return null;
  }
}
