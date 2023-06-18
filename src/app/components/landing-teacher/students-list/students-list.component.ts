import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent {


  students: any[];

  constructor(private userService: UsersService) {
    this.students = [];
  }

  async ngOnInit (){
    this.students = await this.userService.getAllUser();
    
  }
 
}

