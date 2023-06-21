import { Subject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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
  // teacherId: number;
  isEdition = false;
  usersService = inject(UsersService);
  teacherStored: any;

  constructor(
    private categoriesService: CategoriesService,
    private locationsService: LocationsService,
    // private usersService: UsersService,
    private teachersService: TeachersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
      //console.log(params);
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
          first_name: new FormControl(this.teacherStored.first_name, []),
          last_name: new FormControl(this.teacherStored.last_name, []),
          username: new FormControl(this.teacherStored.username, []),
          email: new FormControl(this.teacherStored.email, []),
          password: new FormControl(this.teacherStored.password, []),
          repitePassword: new FormControl(this.teacherStored.password, []),
          phone: new FormControl(this.teacherStored.phone, []),
          address: new FormControl(this.teacherStored.address, []),
          avatar: new FormControl(this.teacherStored.avatar, []),
          province_id: new FormControl(this.teacherStored.province_id, []),
          city_id: new FormControl(this.teacherStored.city_id, []),
          price_hour: new FormControl(this.teacherStored.price_hour, []),
          category_id: new FormControl(this.teacherStored.category_id, []),
          subject: new FormControl(this.teacherStored.subject, []),
          experience: new FormControl(this.teacherStored.experience, []),
          start_class_hour: new FormControl(this.teacherStored.start_class_hour, []),
          end_class_hour: new FormControl(this.teacherStored.end_class_hour, [])
        })
        //this.teacherId = parseInt(params.teacherid)
        // if (this.teacherId) {
        //this.action = "Actualizar";
        //this.teacherId = id;
        //this.isEdition = true;
        // const response = this.usersService.getById(id);
        //console.log(response)
        //this.loadTeacherData();
        /*           this.teacherForm = new FormGroup({
                    id: new FormControl(id, []),
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
                  }, []); */
        //}
        //})
        // } catch (error) {
        //   console.log(error);
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

  // async loadTeacherData() {
  //   const response = await this.teachersService.getTeacherById(this.teacherId);
  //   const response1 = await this.usersService.getById(response.users_id);
  //   if (response.users_id) {
  //     this.title = "update";
  //     this.action = "Update";
  //     this.teacherForm = new FormGroup({
  //       user_id: new FormControl(response.users_id, []),
  //       id: new FormControl(response.users_id, []),
  //       role_id: new FormControl(response.role_id, []),
  //       first_name: new FormControl(response.first_name, []),
  //       last_name: new FormControl(response.last_name, []),
  //       username: new FormControl(response1.username, []),
  //       email: new FormControl(response.email, []),
  //       password: new FormControl(response.password, []),
  //       repitePassword: new FormControl(response.password, []),
  //       phone: new FormControl(response.phone, []),
  //       address: new FormControl(response.address, []),
  //       avatar: new FormControl(response.avatar, []),
  //       province_id: new FormControl(response.province_id, []),
  //       city_id: new FormControl(response.city_id, []),
  //       price_hour: new FormControl(response.price_hour, []),
  //       category_id: new FormControl(response.categories_id, []),
  //       subject: new FormControl(response.subject, []),
  //       experience: new FormControl(response.experience, []),
  //       start_class_hour: new FormControl(response.start_class_hour, []),
  //       end_class_hour: new FormControl(response.end_class_hour, [])
  //     }, []);
  //   }
  // }


  async getDataForm() {
    //console.log(this.teacherForm.value);
    let teacher = this.teacherForm.value;
    if (teacher.id) {
      try {
        /** Actualizamos */
        let response = await this.teachersService.updateTeacher(teacher);
        // console.log(response);
        // console.log(response.user_id);
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
        console.log(error)
      }
    } else {
      /** Creamos un nuevo teacher */
      try {
        let response = await this.teachersService.createNewTeacher(teacher);
        //console.log(response)
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
}
