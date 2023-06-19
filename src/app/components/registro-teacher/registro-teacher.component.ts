import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Category } from 'src/app/interfaces/category.interface';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { LocationsService } from 'src/app/services/locations.service';
import { LoginTokenService } from 'src/app/services/login-token.service';
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
  title: string = "Register";

  constructor(
    private categoriesService: CategoriesService,
    private locationsService: LocationsService,
    private usersService: UsersService,
    private teachersService: TeachersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginTokenService: LoginTokenService
  ) {
    this.teacherForm = new FormGroup({
      role_id: new FormControl(this.teacher_role_id, []),
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
      city_id: new FormControl("", []),
      price_hour: new FormControl("", []),
      category_id: new FormControl("", []),
      subject: new FormControl("", []),
      experience: new FormControl("", []),
      start_class_hour: new FormControl("", []),
      end_class_hour: new FormControl("", [])
    }, []);
  }

  async ngOnInit(): Promise<void> {
    try {
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
        //console.log(params.teacherId);
        let id = parseInt(params.teacherid)
        if (id) {
          this.title = "Update";
          this.action = "Update";
          const response = await this.teachersService.getTeacherById(id);
          //console.log(response)
          const teacher: Teacher = response;
          //console.log(teacher)
          this.teacherForm = new FormGroup({
            id: new FormControl(id, []),
            role_id: new FormControl(this.teacher_role_id, []),
            first_name: new FormControl(teacher?.first_name, []),
            last_name: new FormControl(teacher?.last_name, []),
            username: new FormControl(teacher?.username, []),
            email: new FormControl(teacher?.email, []),
            password: new FormControl(teacher?.password, []),
            repitePassword: new FormControl(teacher?.password, []),
            phone: new FormControl(teacher?.phone, []),
            address: new FormControl(teacher?.address, []),
            avatar: new FormControl(teacher?.avatar, []),
            province_id: new FormControl(teacher?.province_id, []),
            city_id: new FormControl(teacher?.city_id, []),
            price_hour: new FormControl(teacher?.price_hour, []),
            category_id: new FormControl(teacher?.category_id, []),
            subject: new FormControl(teacher?.subject, []),
            experience: new FormControl(teacher?.experience, []),
            start_class_hour: new FormControl(teacher?.start_class_hour, []),
            end_class_hour: new FormControl(teacher?.end_class_hour, [])
          }, []);
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ops! It seems that there has been an error.',
        text: "Try it again"
      });
    }
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
    let teacher = this.teacherForm.value;
    if (teacher.id) {
      /** Actualizo */
      try {
        let response = await this.teachersService.updateTeacher(teacher);
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: `The teacher ${response.first_name} ${response.last_name} has been successfully updated.`
          })
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ops! It seems that there has been an error.',
            text: "Try it again"
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      /** Registro */
      try {
        let response = await this.teachersService.createNewTeacher(teacher);
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: `The teacher ${response.first_name} ${response.last_name} has been successfully created.`
          });
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ops! It seems that there has been an error.',
            text: "Try it again"
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.teacherForm.get(pControlName)?.hasError(pError) && this.teacherForm.get(pControlName)?.touched) {
      return true
    }
    return false;
  }

  checkPassword(pFormValue: AbstractControl) {
    const password: string = pFormValue.get('password')?.value; // cojo el valor del password
    const repitepassword: string = pFormValue.get('repitepassword')?.value;

    if (password !== repitepassword) {
      return { 'checkpassword': true }
    }
    return null;
  }

  checkValidControl(controlName: string): boolean {
    let valid = true
    if (this.teacherForm.get(controlName)?.status === "INVALID" && this.teacherForm.get(controlName)?.touched) {
      valid = false
    }
    return valid;
  }


}
