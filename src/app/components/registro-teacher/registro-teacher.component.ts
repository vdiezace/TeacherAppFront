import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
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
  action: string = "Registrar";

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
        let id = parseInt(params.teacherId)
        if (id) {
          this.action = "Actualizar";
          const response = this.usersService.getById(id);
          //console.log(response)

          this.teacherForm = new FormGroup({
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
          }, []);
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

  getDataForm() {
    //console.log(this.teacherFormulario.value);
    if (this.teacherForm.status === "VALID") {
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
