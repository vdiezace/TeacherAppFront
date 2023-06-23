import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  
  router = inject(Router);

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
