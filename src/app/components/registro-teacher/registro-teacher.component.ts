import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  teacherId = 0;
  isEdition = false;

  constructor(
    private categoriesService: CategoriesService,
    private locationsService: LocationsService,
    private usersService: UsersService,
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
          //this.action = "Actualizar";
          this.teacherId = id;
          this.isEdition = true;
          // const response = this.usersService.getById(id);
          //console.log(response)
          this.loadTeacherData();
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
        }
      })
    } catch (error) {
      console.log(error);
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

  async loadTeacherData() {
    const response = await this.teachersService.getTeacherById(this.teacherId);
    const response1 = await this.usersService.getById(response.users_id);
    if (response.users_id) {
      this.title = "Update";
      this.action = "update";
      this.teacherForm = new FormGroup({
        users_id: new FormControl(response.users_id, []),
        user_id: new FormControl(response.users_id, []),
        id: new FormControl(response.users_id, []),
        role_id: new FormControl(response.role_id, []),
        first_name: new FormControl(response.first_name, []),
        last_name: new FormControl(response.last_name, []),
        username: new FormControl(response1.username, []),
        email: new FormControl(response.email, []),
        password: new FormControl(response.password, []),
        repitePassword: new FormControl(response.password, []),
        phone: new FormControl(response.phone, []),
        address: new FormControl(response.address, []),
        avatar: new FormControl(response.avatar, []),
        province_id: new FormControl(response.province_id, []),
        city_id: new FormControl(response.city_id, []),
        price_hour: new FormControl(response.price_hour, []),
        category_id: new FormControl(response.categories_id, []),
        subject: new FormControl(response.subject, []),
        experience: new FormControl(response.experience, []),
        start_class_hour: new FormControl(response.start_class_hour, []),
        end_class_hour: new FormControl(response.end_class_hour, [])
      }, []);
    }
  }


  getDataForm() {
    //console.log(this.teacherFormulario.value);
    if (this.teacherForm.status === "VALID") {

      if (this.isEdition) {
        console.log(this.teacherForm.value);
        this.teachersService.updateTeacher(this.teacherId, this.teacherForm.value);
      } else {

        console.log("click?");
        this.activatedRoute.params.subscribe(async (params: any) => {
          const user = await this.usersService.findByEmail(this.teacherForm.value.email);
          let response: any;
          let teacher = this.teacherForm.value;

          if (!params.teacherId) {
            if (user != null) {
              alert("Error al registrar el usuario. El correo introducido ya existe")
            } else {
              if (this.userLatitude != undefined) {
                teacher.latitude = this.userLatitude;
                teacher.longitude = this.userLongitude;
              }
              try {
                response = this.teachersService.createNewTeacher(teacher);
                if (response.teachers_id) {
                  alert("El profesor se ha creado correctamente");
                }
                this.router.navigate(["/login"]);
              } catch (error) {
                console.log(error)
              }
            }
          }
        })
      }
    }

  }
}
