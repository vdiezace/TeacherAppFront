import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


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
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProfileComponent } from './components/student-dashboard/profile/profile.component';
import { ClassesComponent } from './components/student-dashboard/classes/classes.component';
import { TeachersComponent } from './components/student-dashboard/teachers/teachers.component';
import { ChatComponent } from './components/student-dashboard/chat/chat.component';
import { ReviewsComponent } from './components/student-dashboard/reviews/reviews.component';
import { TeachersDetailsComponent } from './components/student-dashboard/teachers-details/teachers-details.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MapComponent } from './components/map/map.component';
import { LandingTeacherComponent } from './components/landing-teacher/landing-teacher.component';
import { StudentslistComponent } from './components/studentslist/studentslist.component';
import { TeacherprofileComponent } from './components/teacherprofile/teacherprofile.component';
import { TeacherFilterComponent } from './components/teacher-filter/teacher-filter.component';
import { StudentsComponent } from './components/admin-dashboard/students/students.component';
import { HomeComponentAdmin } from './components/admin-dashboard/home/home.component';
import { ProfileComponentAdmin } from './components/admin-dashboard/profile/profile.component';
import { TeachersComponentAdmin } from './components/admin-dashboard/teachers/teachers.component';
import { TeachersReviewsComponent } from './components/student-dashboard/teachers-reviews/teachers-reviews.component';
import { environment } from './environments/environment';
import { AgmCoreModule } from '@agm/core';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';



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
    LoginFormComponent,
    ProfileComponent,
    ClassesComponent,
    TeachersComponent,
    ChatComponent,
    ReviewsComponent,
    TeachersDetailsComponent,
    RegistroComponent,
    MapComponent,
    LandingTeacherComponent,
    StudentslistComponent,
    TeacherprofileComponent,
    TeacherFilterComponent,
    StudentsComponent,
    HomeComponentAdmin,
    ProfileComponentAdmin,
    TeachersComponentAdmin,
    TeachersReviewsComponent,
    FilterPipe,
    SortPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot(environment.googleMaps),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
