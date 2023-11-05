import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Score, SwapiService } from 'src/app/core';
import { SetLoadingState } from './gameboard.actions';

export interface GameboardStateModel {
  isLoading: boolean;
  score: Score;
}

const initialState: GameboardStateModel = {
  isLoading: false,
  score: {
    playerOneScore: 0,
    playerTwoScore: 0,
  },
};

@State<GameboardStateModel>({
  name: 'gameboard',
  defaults: initialState,
})
@Injectable()
export class GameboardState {
  constructor(private swapiService: SwapiService) {}

  @Action(SetLoadingState)
  setLoadingState(ctx: StateContext<GameboardStateModel>, action: SetLoadingState) {
    ctx.patchState({
      isLoading: action.payload,
    });
  }
}
