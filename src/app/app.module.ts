import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environments } from './environments/environments';
//import { AgmCoreModule } from '@agm/core';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/** Components */
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { C404Component } from './components/c404/c404.component';
import { FooterComponent } from './components/footer/footer.component';
import { StudentHeaderComponent } from './components/student-header/student-header.component';
import { TeacherHeaderComponent } from './components/teacher-header/teacher-header.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/student-dashboard/profile/profile.component';
import { ClassesComponent } from './components/student-dashboard/classes/classes.component';
import { TeachersComponent } from './components/student-dashboard/teachers/teachers.component';
import { ChatComponent } from './components/student-dashboard/chat/chat.component';
import { ReviewsComponent } from './components/student-dashboard/reviews/reviews.component';
import { TeachersDetailsComponent } from './components/student-dashboard/teachers-details/teachers-details.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LandingTeacherComponent } from './components/landing-teacher/landing-teacher.component';
import { StudentsComponent } from './components/admin-dashboard/students/students.component';
import { HomeComponentAdmin } from './components/admin-dashboard/home/home.component';
import { ProfileComponentAdmin } from './components/admin-dashboard/profile/profile.component';
import { TeachersComponentAdmin } from './components/admin-dashboard/teachers/teachers.component';
import { TeachersReviewsComponent } from './components/student-dashboard/teachers-reviews/teachers-reviews.component';
import { TeacherFilterComponent } from './components/teacher-filter/teacher-filter.component';
import { TeacherprofileComponent } from './components/teacherprofile/teacherprofile.component';
import { StudentHomeComponent } from './components/student-dashboard/student-home/student-home.component';
import { TeacherClassesComponent } from './components/landing-teacher/teacher-classes/teacher-classes.component';
import { StudentsListComponent } from './components/landing-teacher/students-list/students-list.component';
import { EditComponent } from './components/teacherprofile/edit/edit.component';
import { RegistroTeacherComponent } from './components/registro-teacher/registro-teacher.component';
import { RegistroStudentComponent } from './components/registro-student/registro-student.component';
import { ReviewsTeachersComponent } from './components/reviews-teachers/reviews-teachers.component';


@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    C404Component,
    FooterComponent,
    StudentHeaderComponent,
    TeacherHeaderComponent,
    AdminHeaderComponent,
    HomeComponent,
    AboutUsComponent,
    LoginComponent,
    ContactComponent,
    ProfileComponent,
    ClassesComponent,
    TeachersComponent,
    ChatComponent,
    ReviewsComponent,
    TeachersDetailsComponent,
    RegistroComponent,
    LandingTeacherComponent,
    StudentsComponent,
    HomeComponentAdmin,
    ProfileComponentAdmin,
    TeachersComponentAdmin,
    TeachersReviewsComponent,
    FilterPipe,
    SortPipe,
    TimeFormatPipe,
    TeacherFilterComponent,
    TeacherprofileComponent,
    StudentHomeComponent,
    TeacherClassesComponent,
    StudentsListComponent,
    TimeFormatPipe,
    EditComponent,
    RegistroTeacherComponent,
    RegistroStudentComponent,
    ReviewsTeachersComponent,
    //NewMapComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    //AgmCoreModule.forRoot(environments.googleMaps)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }