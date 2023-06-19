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
      teacher.province.includes(this.provinceSelected) &&  (!teacher.category_title || teacher.category_title.includes(this.categorySelected))  &&  (+teacher.avg_rating) >= (+this.ratingSelected) && teacher.experience >= this.experienceSelected);
    console.log(this.teachers); 

  }

  async ngOnInit() {
    const response = await this.teachersService.getAllTeachers();
    console.log(response);
    this.teachers= response;
    this.filterTeachers();
  }


}




  /*
  teachers: Teacher [];
  selectedValue: any;
  selectedExperience: number = 0;
  filteredTeachers: any[] = [];
  selectedRating: number = 0;
  selectedProvince: string = "";


  ChangeAVG_Rating(e: Event) {
    this.selectedValue = (e.target as HTMLInputElement).value;
  }
  
 
 
  constructor(private teacherService: TeachersService) {
    this.teachers = [];

  }

  applyFilterExperience() {
    if (this.selectedExperience !== null) {
      this.filteredTeachers = this.uniqueTeachers.filter(teacher => {
        if (typeof teacher.experience === 'number') {
          return teacher.experience === this.selectedExperience;
        } else {
          return Number(teacher.experience) === this.selectedExperience;
        }
      });
    } else {
      this.filteredTeachers = this.uniqueTeachers; 
    }
  }
  
  applyFilterRating() {
    if (this.selectedRating !== null) {
      this.filteredTeachers = this.uniqueTeachers.filter(teacher => {
        if (typeof teacher.avg_rating === 'number') {
          return teacher.avg_rating === this.selectedExperience;
        } else {
          return Number(teacher.avg_rating) === this.selectedRating;
        }
      });
    } else {
      this.filteredTeachers = this.uniqueTeachersRating; 
    }
  }
  
  applyFilterProvince() {
    if (this.selectedProvince !== null) {
      this.filteredTeachers = this.uniqueTeachers.filter(teacher => {
        if (typeof teacher.province === 'string') {
          return teacher.province === this.selectedProvince;
        } else {
          return (teacher.province) === this.selectedProvince;
        }
      });
    } else {
      this.filteredTeachers = this.uniqueTeachersProvince; 
    }
  }
  

  getTeachers(): void {
/*     this.teacherService.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
    }); 
  }

  async ngOnInit() {
/*     const teachers = await this.teacherService.getAllTeachers().toPromise();
    this.teachers = teachers ? teachers : [];
    this.getTeachers(); 
  }
  

  get uniqueTeachers(): Teacher[] {
    const uniqueValues: Teacher[] = [];

    this.teachers.forEach((teacher) => {
      const isValueAlreadyCaptured = uniqueValues.some(
        (uniqueTeacher) => uniqueTeacher.experience === teacher.experience
      );

      if (!isValueAlreadyCaptured) {
        uniqueValues.push(teacher);
      }
    });

    return uniqueValues;
  }


  get uniqueTeachersRating(): Teacher[] {
    const uniqueValues: Teacher[] = [];

    this.teachers.forEach((teacher) => {
      const isValueAlreadyCaptured = uniqueValues.some(
        (uniqueTeacher) => uniqueTeacher.avg_rating === teacher.avg_rating
      );

      if (!isValueAlreadyCaptured) {
        uniqueValues.push(teacher);
      }
    });

    return uniqueValues;
  }

  get uniqueTeachersProvince(): Teacher[] {
    const uniqueValues: Teacher[] = [];

    this.teachers.forEach((teacher) => {
      const isValueAlreadyCaptured = uniqueValues.some(
        (uniqueTeacher) => uniqueTeacher.province === teacher.province
      );

      if (!isValueAlreadyCaptured) {
        uniqueValues.push(teacher);
      }
    });

    return uniqueValues;
  }
}
*/







