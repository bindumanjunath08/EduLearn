import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { applicationRoutes } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { CreateAccountComponent } from './create-account/create-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GetUsernameComponent } from './get-username/get-username.component';
import { UserService } from './services/user.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ClassesComponent } from './classes/classes.component';
import { RewardAssignmentComponent } from './reward-assignment/reward-assignment.component';
import { CorrectComponent } from './correct/correct.component';
import { CreateclassComponent } from './createclass/createclass.component';
import { CreateassignmnetComponent } from './createassignmnet/createassignmnet.component';
import { AddnotesComponent } from './addnotes/addnotes.component';
import { ViewassignmentComponent } from './viewassignment/viewassignment.component';
import { FilestackModule } from '@filestack/angular';
import { FeedbackComponent } from './feedback/feedback.component';
import { ViewfeedbacksComponent } from './viewfeedbacks/viewfeedbacks.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,

    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    GetUsernameComponent,


    FilterPipe,
    FileUploadComponent,
    ClassesComponent,
    RewardAssignmentComponent,
    CorrectComponent,
    CreateclassComponent,
    CreateassignmnetComponent,
    AddnotesComponent,
    ViewassignmentComponent,
    FeedbackComponent,
    ViewfeedbacksComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(applicationRoutes), HttpClientModule, FormsModule, ReactiveFormsModule, NgbModule, AngularFileUploaderModule,
    FilestackModule.forRoot({ apikey: 'AyYyetEbnSBOD5zESgaUSz' }),

  ],
  providers: [UserService, FilterPipe],
  bootstrap: [MainComponent]
})
export class AppModule { }
