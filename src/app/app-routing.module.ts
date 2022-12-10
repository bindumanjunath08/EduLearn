import { Routes } from "@angular/router";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { GetUsernameComponent } from "./get-username/get-username.component";
import { HomeComponent } from "./home/home.component";
import { AuthService } from './models/auth.service';

import { LoginComponent } from "./login/login.component";

import { FeedbackComponent } from "./feedback/feedback.component";

import { FileUploadComponent } from "./file-upload/file-upload.component";
import { ClassesComponent } from "./classes/classes.component";
import { RewardAssignmentComponent } from "./reward-assignment/reward-assignment.component";
import { CorrectComponent } from "./correct/correct.component";
import { CreateclassComponent } from "./createclass/createclass.component";
import { AddnotesComponent } from "./addnotes/addnotes.component";
import { CreateassignmnetComponent } from "./createassignmnet/createassignmnet.component";
import { ViewassignmentComponent } from "./viewassignment/viewassignment.component";
import { ViewfeedbacksComponent } from './viewfeedbacks/viewfeedbacks.component';

export const applicationRoutes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthService] },
    { path: 'login', component: LoginComponent },
    { path: 'file_upload', component: FileUploadComponent },
    { path: 'classes/feedback/:id', component: FeedbackComponent },
    { path: 'classes/viewfeedback/:id', component: ViewfeedbacksComponent },

    { path: 'create-account', component: CreateAccountComponent },
    { path: 'forgot-password/:id', component: ForgotPasswordComponent },
    { path: 'get-username', component: GetUsernameComponent },
    { path: 'assignment/viewassignment/:id', component: ViewassignmentComponent },

    { path: 'createassignment', component: CreateassignmnetComponent },
    { path: 'addnotes', component: AddnotesComponent },
    { path: 'createclass', component: CreateclassComponent },
    { path: 'classes/:id', component: ClassesComponent },
    { path: 'correct/:id', component: CorrectComponent },
    { path: 'rewardassignment/:id', component: RewardAssignmentComponent },
    { path: '', component: HomeComponent, canActivate: [AuthService] }
]