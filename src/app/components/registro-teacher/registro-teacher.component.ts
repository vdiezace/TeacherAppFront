import { Subject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { LocationsService } from 'src/app/services/locations.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-teacher',
  templateUrl: './registro-teacher.component.html',
  styleUrls: ['./registro-teacher.component.css']
})
export class RegistroTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  teacher_role_id = 2;
  province: Province[] = [];
  citiesByProvince: City[] = [];
  city: City[] = [];
  categories: Category[] = [];
  timeStampList: any[] = [];
  userLatitude: number | undefined = undefined;
  userLongitude: number | undefined = undefined;
  action: string = "Register";
  title: string = "register"
  isEdition = false;
  usersService = inject(UsersService);
  teacherStored: any;

  constructor(
    private categoriesService: CategoriesService,
    private locationsService: LocationsService,
    private teachersService: TeachersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.teacherForm = new FormGroup({
      role_id: new FormControl(this.teacher_role_id, []),
      first_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      username: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      repitePassword: new FormControl("", [Validators.required, this.checkPassword]),
      phone: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]),
      address: new FormControl("", []),
      avatar: new FormControl("", []),
      province_id: new FormControl("", [Validators.required]),
      city_id: new FormControl("", [Validators.required]),
      price_hour: new FormControl("", [Validators.required]),
      category_id: new FormControl("", [Validators.required]),
      subject: new FormControl("", [Validators.required]),
      is_approved: new FormControl(0, [Validators.required]),
      experience: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      start_class_hour: new FormControl("", [Validators.required]),
      end_class_hour: new FormControl("", [Validators.required])
    }, []);
  }

  async ngOnInit(): Promise<void> {
    //try {
    this.province = await this.locationsService.getAllProvinces();
    this.city = await this.locationsService.getAllCities();
    this.categories = await this.categoriesService.getAllCategories();

    this.createTimeStamp();

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.userLatitude = latitude,
        this.userLongitude = longitude
    })
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = parseInt(params.teacherid);
      if (id) {
        this.title = "update";
        this.action = "Update";
        this.teacherStored = await this.teachersService.getTeacherById(id);
        this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(this.teacherStored.province_id));

        this.teacherForm = new FormGroup({
          id: new FormControl(id, []),
          user_id: new FormControl(this.teacherStored.user_id, []),
          role_id: new FormControl(this.teacher_role_id, []),
          first_name: new FormControl(this.teacherStored.first_name, [Validators.required, Validators.minLength(3)]),
          last_name: new FormControl(this.teacherStored.last_name, [Validators.required, Validators.minLength(3)]),
          username: new FormControl(this.teacherStored.username, [Validators.required, Validators.minLength(3)]),
          email: new FormControl(this.teacherStored.email, [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
          password: new FormControl(this.teacherStored.password, [Validators.required, Validators.minLength(8)]),
          repitePassword: new FormControl(this.teacherStored.password, [Validators.required, this.checkPassword]),
          phone: new FormControl(this.teacherStored.phone, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]),
          address: new FormControl(this.teacherStored.address, []),
          avatar: new FormControl(this.teacherStored.avatar, []),
          province_id: new FormControl(this.teacherStored.province_id, [Validators.required]),
          city_id: new FormControl(this.teacherStored.city_id, [Validators.required]),
          price_hour: new FormControl(this.teacherStored.price_hour, [Validators.required]),
          category_id: new FormControl(this.teacherStored.category_id, [Validators.required]),
          subject: new FormControl(this.teacherStored.subject, [Validators.required]),
          experience: new FormControl(this.teacherStored.experience, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
          start_class_hour: new FormControl(this.teacherStored.start_class_hour, [Validators.required]),
          end_class_hour: new FormControl(this.teacherStored.end_class_hour, [Validators.required])
        })
      }
    })
  }

  createTimeStamp() {
    for (let i = 0; i < 24; i++) {
      const timeStamp = {
        value: i,
        hour: i + ':00'
      }
      this.timeStampList.push(timeStamp)
    }
  }

  onSelected(e: any) {
    try {
      this.citiesByProvince = this.city.filter(c => c.province_id == parseInt(e.target.value))
    } catch (error) {
      console.log(error)
    }
  }

  async getDataForm() {
    if (this.teacherForm.status === "VALID") {
      this.activatedRoute.params.subscribe(async (params: any) => {
        const user = await this.usersService.findByEmail(this.teacherForm.value.email);
        let response: Teacher | any;
        let teacher = this.teacherForm.value;
        let id = parseInt(params.teacherid);
        if (!id) {
          if (user != null) {
            Swal.fire({
              icon: 'error',
              title: 'Error registering the user.',
              text: "The email address already exists"
            });
          } else {
            if (this.userLatitude != undefined) {
              teacher.latitude = this.userLatitude;
              teacher.longitude = this.userLongitude;
            }
            try {
              response = await this.teachersService.createNewTeacher(teacher);
              if (response.user_id) {
                Swal.fire({
                  icon: 'success',
                  title: `The teacher ${response.first_name} ${response.last_name} has been successfully created.`
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
              console.log(error)
            }
          }
        } else {
          if (this.userLatitude != undefined) {
            teacher.latitude = this.userLatitude;
            teacher.longitude = this.userLongitude;
          } try {
            const response = await this.teachersService.updateTeacher(teacher);
            if (response.user_id) {
              Swal.fire({
                icon: 'success',
                title: `The teacher ${response.first_name} ${response.last_name} has been successfully updated.`
              })
              this.router.navigate(['/teachers']);
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
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: "The data entered is incorrect. Please check the information you have entered"
      })
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.teacherForm.get(pControlName)?.hasError(pError) && this.teacherForm.get(pControlName)?.touched) {
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
    if (this.teacherForm.get(pControlName)?.status === "INVALID" && this.teacherForm.get(pControlName)?.touched) {
      return false;
    }
    return true;
  }

  checkScheduleTime(pFormValue: AbstractControl) {
    const start_class_hour = parseInt(pFormValue.get('start_class_hour')?.value);
    const end_class_hour = parseInt(pFormValue.get('end_class_hour')?.value);
    if (start_class_hour >= end_class_hour) {
      return { 'checkscheduletime': true }
    }
    return null;
  }
}
