import { LoginTokenService } from 'src/app/services/login-token.service';
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {

  teachers: Teacher[];
  filteredTeachers: any[];
  provinces = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Baleares",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
    "Ceuta",
    "Melilla"
  ];

  categories = [
    "Matemáticas",
    "Física",
    "Inglés",
    "Mecánica",
    "Biología",
    "Francés",
    "Música",
    "Arte",
    "Programación"
  ];

  ratings = [
    2,
    3,
    4
  ];

  experiences = [
    2,
    5,
    10
  ]

  provinceSelected: string;
  categorySelected: string;
  ratingSelected: number;
  experienceSelected: number;
  userData: any;
  cardsPerPage = 4;

  constructor(private teachersService: TeachersService,
    private studentService: StudentsService,
    private logintTokenService: LoginTokenService) {

    this.teachers = [];
    this.filteredTeachers = [];
    this.provinceSelected = "";
    this.categorySelected = "";
    this.ratingSelected = 0;
    this.experienceSelected = 0;
  }

  filterTeachers() {
    this.filteredTeachers = this.teachers.filter(teacher =>
      teacher.province.includes(this.provinceSelected) &&  (!teacher.category_title || teacher.category_title.includes(this.categorySelected))  &&  (+teacher.avg_rating) >= (+this.ratingSelected) && teacher.experience >= this.experienceSelected);
    console.log(this.teachers);   
  }

  async ngOnInit() {
    const response = await this.teachersService.getAllTeachers();
    console.log(response);
    this.teachers= response;
    this.filterTeachers();

    this.userData = await this.studentService.getStudentById(this.logintTokenService.getId());
    console.log(this.userData);
  
  }

  showMoreCards() {
    this.cardsPerPage += 4;
  }
}
