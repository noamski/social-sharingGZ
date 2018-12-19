import { Route } from '@angular/router';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate} from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CapturePageComponent } from './pages/capture-page/capture-page.component';
import { CommentPageComponent } from './pages/comment-page/comment-page.component';
import { EndingPageComponent } from './pages/ending-page/ending-page.component';
import {MapPageComponent} from './pages/map-page/map-page.component';
import {SendingReportPageComponent} from './pages/sending-report-page/sending-report-page.component';
import {WebcamPageComponent} from './pages/webcam-page/webcam-page.component';
import {UserlistPageComponent} from './pages/userlist-page/userlist-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'capture', component: CapturePageComponent },
  { path: 'comment', component: CommentPageComponent },
  { path: 'sending-report/:event-type', component: SendingReportPageComponent},
  { path: 'app-webcam-page', component: WebcamPageComponent},
  { path: 'app-userlist-page', component: UserlistPageComponent},
  {path: 'ending', component: EndingPageComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'add-comment', component: AddCommentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

export { routes };
