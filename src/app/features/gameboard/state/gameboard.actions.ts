import { ResourceType, SwapiCommonResponse } from 'src/app/core';

export class IncrementPlayerOne {
  static readonly type = '[Board] Increment Player One';
}

export class IncrementPlayerTwo {
  static readonly type = '[Board] Increment Player Two';
}

export class SetLoadingState {
  static readonly type = '[Loading] Set';
  constructor(public payload: boolean) {}
}

export class FetchSwapiCommonData {
  static readonly type = '[Swapi] Fetch Common Data';
  constructor(public resource: ResourceType) {}
}

export class StoreSwapiCommonData {
  static readonly type = '[Swapi] Store Common Data';
  constructor(public resource: ResourceType, public data: SwapiCommonResponse) {}
}

export class FetchPeople {
  static readonly type = '[Gameboard] Fetch People';
}

export class FetchStarships {
  static readonly type = '[Gameboard] Fetch Starships';
}
