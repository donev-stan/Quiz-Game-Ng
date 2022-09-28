import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { CanLeaveGameGuard } from './quiz-game/can-leave-game.guard';
import { ProfileComponent } from './profile/profile.component';
import { CanPlayGuard } from './shared/guards/can-play.guard';
import { CanLoginGuard } from './shared/guards/can-login.guard';
import { UserRecordsComponent } from './scoreboard/user-records/user-records.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent,

    children: [
      {
        path: ':id',
        component: UserRecordsComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanLoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'profile-edit',
    component: RegisterComponent,
  },
  {
    path: 'quiz-game',
    component: QuizGameComponent,
    canActivate: [CanPlayGuard],
    canDeactivate: [CanLeaveGameGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
