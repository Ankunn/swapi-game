import { Selector } from '@ngxs/store';
import { Score } from 'src/app/core';
import { GameboardState, GameboardStateModel } from './gameboard.state';

export class GameboardSelectors {
  @Selector([GameboardState])
  static getPlayerOneScore(state: GameboardStateModel): number {
    return state.score.playerOneScore;
  }

  @Selector([GameboardState])
  static getPlayerTwoScore(state: GameboardStateModel): number {
    return state.score.playerTwoScore;
  }

  @Selector([GameboardState])
  static getScore(state: GameboardStateModel): Score {
    return state.score;
  }
}
