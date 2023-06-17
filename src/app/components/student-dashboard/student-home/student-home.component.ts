import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
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
    "mathematics",
    "physics",
    "literature",
    "english",
    "mechanics",
    "biology",
    "french",
    "music",
    "arts",
    "programming"
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

  public provinceSelected = "";
  public categorySelected = "";
  public ratingSelected = "0";
  public experienceSelected = "0";


  constructor(private teachersService: TeachersService) {
    this.teachers = [];
    this.filteredTeachers = [];
  }

  filterTeachers() {
/*     this.filteredTeachers = this.teachers.filter(teacher =>
      teacher.province.includes(this.provinceSelected) && teacher.category_title.includes(this.categorySelected) && (+teacher.avg_rating) >= (+this.ratingSelected) && teacher.experience >= this.experienceSelected);
    console.log(this.filteredTeachers); */

  }

  async ngOnInit() {
    const response = await this.teachersService.getAllTeachers();
    console.log(response);
    this.filterTeachers();
    console.log(this.teachers);
  }


}
