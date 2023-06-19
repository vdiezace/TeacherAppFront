import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { LocationsService } from 'src/app/services/locations.service';
import { LoginTokenService } from 'src/app/services/login-token.service';
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
  action: string = "Register";
  title: string = "Register";

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private locationsService: LocationsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private loginTokenService: LoginTokenService
  ) {
    this.studentForm = new FormGroup({
      role_id: new FormControl(this.student_role_id, []),
      first_name: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      ]),
      username: new FormControl("", [
        Validators.required,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      repitePassword: new FormControl("", [
        Validators.required
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[+][0-9]+$/),
        Validators.maxLength(13),
        Validators.minLength(11)]),
      address: new FormControl("", []),
      avatar: new FormControl("", []),
      province_id: new FormControl("", [Validators.required]),
      city_id: new FormControl("", [Validators.required])
    }, [this.checkPassword]);
  }

  async ngOnInit(): Promise<void> {
    /** Capturamos la ruta activa */
    try {
      this.province = await this.locationsService.getAllProvinces();
      this.city = await this.locationsService.getAllCities();
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.userLatitude = latitude,
          this.userLongitude = longitude
      })
      this.activatedRoute.params.subscribe(async (params: any) => {
        let id = parseInt(params.studentid);
        /** Actualizar los componentes pidiendolos previamente a la bbdd */
        if (id) {
          this.title = "Update";
          this.action = "Update";
          const response = await this.studentsService.getStudentById(id);
          const student: Student = response;
          this.studentForm = new FormGroup({
            id: new FormControl(id, []),
            role_id: new FormControl(this.student_role_id, []),
            first_name: new FormControl(student?.first_name, []),
            last_name: new FormControl(student?.last_name, []),
            username: new FormControl(student?.username, []),
            email: new FormControl(student?.email, []),
            password: new FormControl(student?.password, []),
            repitePassword: new FormControl(student?.password, []),
            phone: new FormControl(student?.phone, []),
            address: new FormControl(student?.address, []),
            avatar: new FormControl(student?.avatar, []),
            province_id: new FormControl(student?.province_id, []),
            city_id: new FormControl(student?.city_id, [])
          }, []);
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ops! Parece que ha habido un error',
        text: "Inténtelo de nuevo"
      });
    }
  }

  async getDataForm() {

    let student = this.studentForm.value;
    if (student.id) {
      /** Actualizo */
      try {
        let response = await this.studentsService.updateStudent(student);
        //console.log(response);
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: `El estudiante ${response.first_name} ${response.last_name} se ha actualizado correctamente`
          })
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ops! Parece que ha habido un error',
            text: "Inténtelo de nuevo"
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      /** Registro */
      try {
        /** CREACION DE UN NUEVO ESTUDIANTE */
        /** Estudiante guardado */
        let response = await this.studentsService.createNewStudent(student);
        //console.log(response);
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: `El estudiante ${response.first_name} ${response.last_name} se ha creado correctamente`
          });
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ops! Parece que ha habido un error',
            text: "Inténtelo de nuevo"
          });
        }
      } catch (error) {
        console.log(error)
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
    const password: string = pFormValue.get('password')?.value; // cojo el valor del password
    const repitepassword: string = pFormValue.get('repitepassword')?.value;

    if (password !== repitepassword) {
      return { 'checkpassword': true }
    }
    return null;
  }

  checkValidControl(controlName: string): boolean {
    let valid = true
    if (this.studentForm.get(controlName)?.status === "INVALID" && this.studentForm.get(controlName)?.touched) {
      valid = false
    }
    return valid;
  }


}


