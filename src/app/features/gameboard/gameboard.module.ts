import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { BattleSwitcherComponent } from './battle-switcher/battle-switcher.component';
import { GameboardComponent } from './gameboard.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  {
    path: '',
    component: GameboardComponent,
  },
];

@NgModule({
  declarations: [GameboardComponent, PlayerInfoComponent, BattleSwitcherComponent, ScoreboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatBadgeModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatListModule,
  ],
  exports: [],
})
export class GameboardModule {}
