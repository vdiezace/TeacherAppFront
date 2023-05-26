import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  arrSteps: any[];
  currentStep = 0;

  constructor() {
    this.arrSteps = [
      {title1: 1, title2: "Sign up to teacherApp", image: "/assets/aboutUs/signup.png"},
      {title1: 2, title2: "Choose the subject", image: "/assets/aboutUs/signup.png"},
      {title1: 3, title2: "Sign up to teacherApp", image: "/assets/aboutUs/signup.png"},
      {title1: 4, title2: "Sign up to teacherApp", image: "/assets/aboutUs/signup.png"}
  ]
  }

  nextStep(): void {
    if (this.currentStep < this.arrSteps.length -1) {
      this.currentStep++;
    }
  }

}
