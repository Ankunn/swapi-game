import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { of, tap } from 'rxjs';
import {
  PersonProperties,
  ResourceType,
  Score,
  StarshipProperties,
  SwapiCommonResponse,
  SwapiService,
} from 'src/app/core';

import { FetchSwapiCommonData, IncrementPlayerOne, IncrementPlayerTwo, SetLoadingState } from './gameboard.actions';

/*
Playing around with NGXS, tried to create an alternative way for caching, loading and scoring.
*/

export interface GameboardStateModel {
  isLoading: boolean;
  score: Score;
  commonData: {
    [key in ResourceType]?: SwapiCommonResponse;
  };
  peopleData: PersonProperties[];
  starshipsData: StarshipProperties[];
}

const initialState: GameboardStateModel = {
  isLoading: false,
  score: {
    playerOneScore: 0,
    playerTwoScore: 0,
  },
  commonData: {},
  peopleData: [],
  starshipsData: [],
};

@State<GameboardStateModel>({
  name: 'gameboard',
  defaults: initialState,
})
@Injectable()
export class GameboardState {
  constructor(private swapiService: SwapiService) {}

  @Action(FetchSwapiCommonData)
  fetchCommonData(ctx: StateContext<GameboardStateModel>, { resource }: FetchSwapiCommonData) {
    const state = ctx.getState();
    if (state.commonData[resource]) {
      return of(state.commonData[resource]);
    } else {
      return this.swapiService.fetchCommonData(resource).pipe(
        tap(response => {
          ctx.patchState({
            commonData: {
              ...state.commonData,
              [resource]: response,
            },
          });
        })
      );
    }
  }

  @Action(IncrementPlayerOne)
  incrementPlayerOne(ctx: StateContext<GameboardStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      score: {
        ...state.score,
        playerOneScore: state.score.playerOneScore + 1,
      },
    });
  }

  @Action(IncrementPlayerTwo)
  incrementPlayerTwo(ctx: StateContext<GameboardStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      score: {
        ...state.score,
        playerTwoScore: state.score.playerTwoScore + 1,
      },
    });
  }

  @Action(SetLoadingState)
  setLoadingState(ctx: StateContext<GameboardStateModel>, action: SetLoadingState) {
    ctx.patchState({
      isLoading: action.payload,
    });
  }
}
