import { Component } from '@angular/core';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {

  teachers: any[];
  filteredTeachers: any[];

  public provinceSelected= "";

  constructor( private teacherService: TeacherService) {
    this.teachers = [];
    this.filteredTeachers = [];
  }

  filterOptions = [
    { label: 'All', value: 'all'},
    { label: 'Avg_rating', value: 'average rating'},
    { label: 'Category_title', value: 'category title'},
    { label: 'City', value: 'city'},
    { label: 'Experience', value: 'experience'},
    { label: 'Price_hour', value: 'price_hour'}

  ]

  onSelectProvince() {
    console.log(this.provinceSelected);
    this.filterTeachers();  
  }

/*   filterTeachers(filterValue: string) {
    if(filterValue === 'all') {
      this.filteredTeachers = this.teachers;
    } else {
      this.filteredTeachers = this.teachers.filter(teacher => teacher.category === filter.value)
    }
  }
 */

   filterTeachers() {
    this.filteredTeachers= this.teachers.filter(teacher =>
      teacher.province.includes(this.provinceSelected));
      console.log(this.filteredTeachers);
  }
 
   async ngOnInit() {
    this.teachers = await this.teacherService.getAll();
    this.filterTeachers();
    console.log(this.teachers);
  }


}
