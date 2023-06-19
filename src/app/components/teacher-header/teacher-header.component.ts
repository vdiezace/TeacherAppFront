import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.css']
})
export class TeacherHeaderComponent {


  router = inject(Router);

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
