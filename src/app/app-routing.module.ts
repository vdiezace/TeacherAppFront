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
import { LandingTeacherComponent } from './components/landing-teacher/landing-teacher.component';
import { TeacherprofileComponent } from './components/teacherprofile/teacherprofile.component';
import { TeachersGuard } from './guards/teachers.guard';
import { HomeComponentAdmin } from './components/admin-dashboard/home/home.component';
import { ProfileComponentAdmin } from './components/admin-dashboard/profile/profile.component';
import { TeachersComponentAdmin } from './components/admin-dashboard/teachers/teachers.component';
import { StudentsComponent } from './components/admin-dashboard/students/students.component';
import { AdminGuard } from './guards/admin.guard';
import { TeachersReviewsComponent } from './components/student-dashboard/teachers-reviews/teachers-reviews.component';
import { StudentHomeComponent } from './components/student-dashboard/student-home/student-home.component';
import { TeacherClassesComponent } from './components/landing-teacher/teacher-classes/teacher-classes.component';
import { StudentsListComponent } from './components/landing-teacher/students-list/students-list.component';

import { RegistroStudentComponent } from './components/registro-student/registro-student.component';
import { RegistroTeacherComponent } from './components/registro-teacher/registro-teacher.component';
import { StudentGuard } from './guards/student.guard';
import { ReviewsTeachersComponent } from './components/reviews-teachers/reviews-teachers.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "login", component: LoginComponent },
  { path: "contact", component: ContactComponent },
  { path: "student/chat", component: ChatComponent },
  { path: "student", component: StudentHomeComponent, canActivate: [StudentGuard] },
  { path: "student/classes", component: ClassesComponent },
  { path: "student/profile", component: ProfileComponent },
  { path: "student/profile/edit/:studentid", component: RegistroStudentComponent, canActivate: [StudentGuard] },
  { path: "student/reviews", component: ReviewsComponent },
  { path: "student/teachers", component: TeachersComponent },
  { path: "student/teachers-details/:teacherid", component: TeachersDetailsComponent },
  { path: "student/teachers-reviews/:teacherid", component: TeachersReviewsComponent },
  { path: "register", component: RegistroComponent },
  { path: "register/student", component: RegistroStudentComponent },
  { path: "register/teacher", component: RegistroTeacherComponent },
  { path: "teachers", component: LandingTeacherComponent, canActivate: [TeachersGuard] },
  { path: "teachers/students-list", component: StudentsListComponent },
  { path: "teachers/classes", component: TeacherClassesComponent },
  { path: "teachers/profile", component: TeacherprofileComponent },
  { path: "teachers/profile/:teacherid", component: RegistroTeacherComponent },
  { path: "teachers/reviews", component: ReviewsTeachersComponent },
  { path: "admin", component: HomeComponentAdmin, canActivate: [AdminGuard] },
  { path: "admin/students", component: StudentsComponent },
  { path: "admin/teachers", component: TeachersComponentAdmin },
  { path: "admin/:adminid", component: ProfileComponentAdmin },
  { path: "student/home", pathMatch: 'full', redirectTo: 'student' },

  { path: "admin/profile", component: ProfileComponentAdmin },
 

  { path: "**", component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
