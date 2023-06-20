import { Component, inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-c404',
  templateUrl: './c404.component.html',
  styleUrls: ['./c404.component.css']
})
export class C404Component {

  usersService = inject(UsersService);
}
