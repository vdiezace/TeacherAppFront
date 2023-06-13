import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

public userData : any;

  constructor( private profileService: ProfileService) {
  }

  async ngOnInit() {
    const response = await this.profileService.getUserData();
    console.log(response);
    this.userData= response;
    if (this.userData){
    console.log(this.userData.avatar);
    }
  }

}
