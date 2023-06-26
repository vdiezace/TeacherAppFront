import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { Student } from 'src/app/interfaces/student.interface';
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
      first_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      username: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      repitePassword: new FormControl("", [Validators.required, this.checkPassword]),
      phone: new FormControl("", [Validators.required, Validators.minLength(9)]),
      address: new FormControl("", []),
      avatar: new FormControl("", []),
      province_id: new FormControl("", [Validators.required]),
      city_id: new FormControl("", [Validators.required])
    }, [])
  }

  async ngOnInit(): Promise<void> {
    try {
      this.province = await this.locationsService.getAllProvinces();
      this.city = await this.locationsService.getAllCities();

      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.userLatitude = latitude;
        this.userLongitude = longitude;
      })

      this.activatedRoute.params.subscribe(async (params: any) => {
        let id = parseInt(params.studentid)
        if (id) {
          this.title = "update";
          this.action = "Update"
          this.studentStored = await this.studentsService.getStudentById(id);
          this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(this.studentStored.province_id));
          this.studentForm = new FormGroup({
            id: new FormControl(id, []),
            user_id: new FormControl(this.studentStored.user_id, []),
            role_id: new FormControl(this.student_role_id, []),
            first_name: new FormControl(this.studentStored.first_name, [Validators.required, Validators.minLength(3)]),
            last_name: new FormControl(this.studentStored.last_name, [Validators.required, Validators.minLength(3)]),
            username: new FormControl(this.studentStored.username, [Validators.required, Validators.minLength(3)]),
            email: new FormControl(this.studentStored.email, [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
            password: new FormControl(this.studentStored.password, [Validators.required, Validators.minLength(8)]),
            repitePassword: new FormControl(this.studentStored.password, [Validators.required, this.checkPassword]),
            phone: new FormControl(this.studentStored.phone, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]),
            address: new FormControl(this.studentStored.address, []),
            avatar: new FormControl(this.studentStored.avatar, []),
            province_id: new FormControl(this.studentStored.province_id, [Validators.required]),
            city_id: new FormControl(this.studentStored.city_id, [Validators.required])
          }, [])
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  onSelected(e: any) {
    try {
      this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(e.target.value))
    } catch (error) {
      console.log(error)
    }
  }

  async getDataForm(): Promise<void> {
    if (this.studentForm.status === "VALID") {
      if ('gelocation' in navigator) {

      }
      this.activatedRoute.params.subscribe(async (params: any) => {
        const user = await this.usersService.findByEmail(this.studentForm.value.email);
        let response!: Student | any;
        let student = this.studentForm.value;
        let id = parseInt(params.studentid);
        if (!id) {
          if (user != null) {
            Swal.fire({
              icon: 'error',
              title: 'Error registering the user.',
              text: "The email address already exists"
            });
          } else {
            if (this.userLatitude != undefined) {
              student.latitude = this.userLatitude;
              student.longitude = this.userLongitude;
            }
            try {
              response = await this.studentsService.createNewStudent(student);
              if (response.users_id) {
                Swal.fire({
                  icon: 'success',
                  title: `The student ${response.first_name} ${response.last_name} has been successfully created.`
                });
                this.router.navigate(['/login']);
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
        } else {
          if (this.userLatitude != undefined) {
            student.latitude = this.userLatitude;
            student.longitude = this.userLongitude;
          }
          try {
            /** Actualizamos */
            const response = await this.studentsService.updateStudent(student);
            if (response.users_id) {
              Swal.fire({
                icon: 'success',
                title: `The student ${response.first_name} ${response.last_name} has been successfully updated.`
              })
              this.router.navigate(['/student/profile']);
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
        }
      })
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

  checkValidControl(pControlName: string): boolean {
    if (this.studentForm.get(pControlName)?.status === "INVALID" && this.studentForm.get(pControlName)?.touched) {
      return false;
    }
    return true;
  }
}
