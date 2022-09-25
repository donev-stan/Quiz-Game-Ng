import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { CanLeaveGameGuard } from './quiz-game/can-leave-game.guard';

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
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'quiz-game',
    component: QuizGameComponent,
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
