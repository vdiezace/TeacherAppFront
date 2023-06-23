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
    if (this.studentForm.status === "VALID") {
      if ('gelocation' in navigator) {

      }
      this.activatedRoute.params.subscribe(async (params: any) => {
        const user = await this.usersService.findByEmail(this.studentForm.value.email);
        let response: any;
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
              if (response[0].users_id) {
                Swal.fire({
                  icon: 'success',
                  title: `The student ${response[0].first_name} ${response[0].last_name} has been successfully created.`
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
              this.router.navigate(['/student']);
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
  // let student = this.studentForm.value;

  // if (student.id) {
  //   try {
  //     /** Actualizamos */
  //     let response = await this.studentsService.updateStudent(student);
  //     if (response.users_id) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: `The student ${response.first_name} ${response.last_name} has been successfully updated.`
  //       })
  //       this.router.navigate(['/student']);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops! There seems to have been an error.',
  //         text: "Try again"
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }

  // } else {
  //   /** Registrando un nuevo estudiante */
  //   try {
  //     let response = await this.studentsService.createNewStudent(student);
  //     //console.log(response);
  //     if (response[0].users_id) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: `The student ${response[0].first_name} ${response[0].last_name} has been successfully created.`
  //       });
  //       this.router.navigate(['/login']);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops! There seems to have been an error.',
  //         text: "Try again"
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
