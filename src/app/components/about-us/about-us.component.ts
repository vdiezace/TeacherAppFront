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
      {title1: 2, title2: "Choose the teacher", image: "/assets/aboutUs/chooseTeacher.png"},
      {title1: 3, title2: "Book the class", image: "/assets/aboutUs/book.png"},
      {title1: 4, title2: "Enjoy the process!!", image: "/assets/aboutUs/enjoy.jpg"}
  ]
  }

  nextStep(): void {
    if (this.currentStep < this.arrSteps.length -1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }

  }

}
