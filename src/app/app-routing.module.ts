import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C404Component } from './components/c404/c404.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatComponent } from './components/student-dashboard/chat/chat.component';
import { ClassesComponent } from './components/student-dashboard/classes/classes.component';
import { ProfileComponent } from './components/student-dashboard/profile/profile.component';
import { ReviewsComponent } from './components/student-dashboard/reviews/reviews.component';
import { TeachersComponent } from './components/student-dashboard/teachers/teachers.component';
import { TeachersDetailsComponent } from './components/student-dashboard/teachers-details/teachers-details.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LandingTeacherComponent } from './components/landing-teacher/landing-teacher.component';
import { StudentslistComponent } from './components/studentslist/studentslist.component';
import { TeacherprofileComponent } from './components/teacherprofile/teacherprofile.component';
import { TeachersGuard } from './guards/teachers.guard';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "login", component: LoginComponent },
  { path: "contact", component: ContactComponent },
  { path: "student/chat", component: ChatComponent},
  { path: "student/classes", component: ClassesComponent},
  { path: "student/profile", component: ProfileComponent},
  { path: "student/reviews", component: ReviewsComponent},
  { path: "student/teachers", component: TeachersComponent},
  { path: "student/teachers-details", component: TeachersDetailsComponent},
  { path: "login-form", component: LoginFormComponent },
  { path: "register", component: RegistroComponent },
  { path: "teachers", component: LandingTeacherComponent, canActivate:[TeachersGuard]},
  { path: "teachers/students-list", component: StudentslistComponent},
  { path: "teachers/:teacherid", component: TeacherprofileComponent},
 
  { path: "**", component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
