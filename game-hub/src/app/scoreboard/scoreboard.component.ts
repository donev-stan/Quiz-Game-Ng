import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
