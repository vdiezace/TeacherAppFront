import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { AdminsService } from 'src/app/services/admins.service';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent {
  usersService = inject(UsersService);
  adminService = inject(AdminsService);
  loginTokenService = inject(LoginTokenService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  adminForm: FormGroup;
  admin_role_id = 1;
  action: string = "update"
  adminData: any = [];

  constructor() {
    this.adminForm = new FormGroup({
      first_name: new FormControl("", []),
      last_name: new FormControl("", []),
      email: new FormControl("", []),
      role_id: new FormControl("", [])
    }, [])
  }

  async ngOnInit(): Promise<void> {
    try {
      this.adminData = await this.adminService.getAdminById(this.loginTokenService.getId());

      this.adminForm = new FormGroup({
        id: new FormControl(this.loginTokenService.getId(), []),
        first_name: new FormControl(this.adminData.first_name, []),
        last_name: new FormControl(this.adminData.last_name, []),
        email: new FormControl(this.adminData.email, []),
        role_id: new FormControl(this.adminData.role_id, [])
      }, [])
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops! There seems to have been an error.',
        text: "Try again"
      });
    }
  }

  async getDataForm() {
    try {
      const response = await this.adminService.updateAdminById(this.loginTokenService.getId(), this.adminForm.value)
      if(response.role_id) {
        Swal.fire({
          icon: 'success',
          title: `The admin ${response.first_name} ${response.last_name} has been successfully updated.`
        });
        this.router.navigate(['/admin/profile'])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops! There seems to have been an error.',
          text: "Try again"
        });

      }
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops! There seems to have been an error.',
        text: "Try again"
      });
    }
  }


}
