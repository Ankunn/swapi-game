import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import {
  BattleSetup,
  PersonAttributeType,
  PersonProperties,
  Score,
  ScoreService,
  ScoreType,
  StarshipAttributeType,
  StarshipProperties,
  SwapiService,
} from 'src/app/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameboardComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  people$?: Observable<PersonProperties[]>;
  starships$?: Observable<StarshipProperties[]>;
  score$: Observable<Score>;
  isLoading$: Observable<boolean>;

  playerOneClass = '';
  playerTwoClass = '';

  constructor(private swapiService: SwapiService, private scoreService: ScoreService) {
    this.score$ = this.scoreService.score$;
    this.isLoading$ = this.swapiService.isLoading$;

    this.scoreService.lastWinner$.pipe(takeUntil(this.destroy$)).subscribe(winner => {
      if (winner) {
        this.playerOneClass = winner === ScoreType.PLAYER_ONE_SCORE ? 'winner-shadow' : 'loser-shadow';
        this.playerTwoClass = winner === ScoreType.PLAYER_TWO_SCORE ? 'winner-shadow' : 'loser-shadow';
      }
    });
  }

  onBattleSetupSelected(battleSetup: BattleSetup): void {
    this.resetDataStreams();

    if (battleSetup.resource === 'people') {
      this.people$ = this.fetchPeopleData(battleSetup.attribute as PersonAttributeType);
    } else if (battleSetup.resource === 'starships') {
      this.starships$ = this.fetchStarshipsData(battleSetup.attribute as StarshipAttributeType);
    }
  }

  onScoreResetSelected(): void {
    this.scoreService.resetScore();
    this.resetDataStreams();
  }

  private fetchPeopleData(attribute: PersonAttributeType): Observable<PersonProperties[]> {
    return this.swapiService
      .fetchPeople()
      .pipe(tap(people => this.scoreService.updateScoresBasedOnAttribute(people, attribute)));
  }

  private fetchStarshipsData(attribute: StarshipAttributeType): Observable<StarshipProperties[]> {
    return this.swapiService
      .fetchStarships()
      .pipe(tap(starships => this.scoreService.updateScoresBasedOnAttribute(starships, attribute)));
  }

  private resetDataStreams(): void {
    this.people$ = undefined;
    this.starships$ = undefined;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
