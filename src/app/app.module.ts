import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
