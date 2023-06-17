import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';




@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent {


  students: any[];

  constructor(private userService: UsersService) {
    this.students = [];
  }

  async ngOnInit (){
    this.students = await this.userService.getAllUser();
    
  }
 
}

