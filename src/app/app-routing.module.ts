import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C404Component } from './components/c404/c404.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LandingTeacherComponent } from './components/landing-teacher/landing-teacher.component';
import { StudentslistComponent } from './components/studentslist/studentslist.component';
import { TeacherprofileComponent } from './components/teacherprofile/teacherprofile.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: RegistroComponent },
  { path: "contact", component: ContactComponent },
  { path: "login-form", component: LoginFormComponent },
  { path: "register", component: RegistroComponent },
  { path: "teachers", component: LandingTeacherComponent},
  { path: "students-list", component: StudentslistComponent},
  { path: "myprofile", component: TeacherprofileComponent},
  { path: "**", component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
