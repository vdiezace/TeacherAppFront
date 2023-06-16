import { Component } from '@angular/core';
import { TeachersService } from '../teachers/teachers.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {

  teachers: any[];
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
    this.filteredTeachers = this.teachers.filter(teacher =>
      teacher.province.includes(this.provinceSelected) && teacher.category_title.includes(this.categorySelected) && (+teacher.avg_rating) >= (+this.ratingSelected) && teacher.experience >= this.experienceSelected);
    console.log(this.filteredTeachers);

  }

  async ngOnInit() {
    this.teachers = await this.teachersService.getAllTeachers();
    this.filterTeachers();
    console.log(this.teachers);
  }


}
