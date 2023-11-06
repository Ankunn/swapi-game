import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Score } from '../interfaces';
import { ScoreType } from '../types';

const initialScore: Score = {
  playerOneScore: 0,
  playerTwoScore: 0,
};

@Injectable({ providedIn: 'root' })
export class ScoreService {
  private scoreSubject = new BehaviorSubject<Score>(initialScore);
  private lastWinnerSubject = new BehaviorSubject<ScoreType | null>(null);

  get lastWinner$(): Observable<ScoreType | null> {
    return this.lastWinnerSubject.asObservable();
  }

  get score$(): Observable<Score> {
    return this.scoreSubject.asObservable();
  }

  updateScoresBasedOnAttribute<T>(players: T[], attribute: keyof T): void {
    if (players.length !== 2) {
      return;
    }

    const firstValue = +players[0][attribute];
    const secondValue = +players[1][attribute];

    if ((isNaN(firstValue) && isNaN(secondValue)) || firstValue === secondValue) {
      return;
    }

    if (isNaN(firstValue)) {
      this.incrementScore(ScoreType.PLAYER_TWO_SCORE);
    } else if (isNaN(secondValue)) {
      this.incrementScore(ScoreType.PLAYER_ONE_SCORE);
    } else if (firstValue > secondValue) {
      this.incrementScore(ScoreType.PLAYER_ONE_SCORE);
    } else if (secondValue > firstValue) {
      this.incrementScore(ScoreType.PLAYER_TWO_SCORE);
    }
  }

  resetScore(): void {
    this.scoreSubject.next(initialScore);
    this.lastWinnerSubject.next(null);
  }

  private setLastWinner(scoreType: ScoreType): void {
    this.lastWinnerSubject.next(scoreType);
  }

  private incrementScore(scoreType: ScoreType): void {
    const currentScore = this.scoreSubject.getValue();
    const newScore = {
      ...currentScore,
      [scoreType]: currentScore[scoreType] + 1,
    };
    this.scoreSubject.next(newScore);
    this.setLastWinner(scoreType);
  }
}
