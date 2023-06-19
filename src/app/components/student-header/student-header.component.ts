import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent {

  router = inject(Router);

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
