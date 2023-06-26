import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';


@Component({
  selector: 'app-teacher-filter',
  templateUrl: './teacher-filter.component.html',
  styleUrls: ['./teacher-filter.component.css']
})
export class TeacherFilterComponent implements OnInit {



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


  constructor(private teachersService: TeachersService) {
    this.teachers = [];
    this.filteredTeachers = [];
    this.provinceSelected = "";
    this.categorySelected = "";
    this.ratingSelected = 0;
    this.experienceSelected = 0;
  }

  filterTeachers() {
    this.filteredTeachers = this.teachers.filter(teacher =>
      teacher.province.includes(this.provinceSelected) && (!teacher.category_title || teacher.category_title.includes(this.categorySelected)) && (+teacher.avg_rating) >= (+this.ratingSelected) && teacher.experience >= this.experienceSelected);
  }

  async ngOnInit() {
    const response = await this.teachersService.getAllTeachers();
    this.teachers = response;
    this.filterTeachers();
  }


}







