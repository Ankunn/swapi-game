import { Component, Input } from '@angular/core';
import { Score } from 'src/app/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() score?: Score | null;
}
