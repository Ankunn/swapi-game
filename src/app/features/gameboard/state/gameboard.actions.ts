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
