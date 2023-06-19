import { Component } from '@angular/core';
import { AdminsService } from 'src/app/services/admins.service';
import { LoginTokenService } from 'src/app/services/login-token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponentAdmin {


  public adminData : any;
  constructor( private AdminService: AdminsService,
    private loginTokenService: LoginTokenService) {
  }

  async ngOnInit() {
    const response = await this.AdminService.getAdminById(this.loginTokenService.getId());
    console.log(response);
    this.adminData= response;
    if (this.adminData){
    console.log(this.adminData.avatar);
    }
  }
}
