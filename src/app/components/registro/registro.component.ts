import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  userForm: FormGroup | any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){

    
    this.userForm = new FormGroup({
      Name: new FormControl("",[
          Validators.required,
          Validators.minLength(3)
      ]),
      Surname: new FormControl("",[
          Validators.required,
          Validators.minLength(3)
      ]),
      Email: new FormControl("",[
          Validators.minLength(5),
          Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
          Validators.email
      ]),
      Password: new FormControl("",[
        Validators.required,
        Validators.minLength(5)
      ]),
      RepitePassword: new FormControl("",[
        Validators.required
      ]),
      Image: new FormControl("")

    }, []);
  }



  getDataForm(){
    console.log(this.userForm)
  }
  ngOnInit(): void {
    
  }
}

