import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BattleSetup, ScoreService, ScoreType, SwapiService } from 'src/app/core';
import { GameboardComponent } from './gameboard.component';
import { GameboardModule } from './gameboard.module';

class MockSwapiService {
  public isLoading$ = of(false);

  fetchPeople(): Observable<any[]> {
    return of([
      { name: 'R4-P17', mass: '45' },
      { name: 'Shaak Ti', mass: '57' },
    ]);
  }
  fetchStarships(): Observable<any[]> {
    return of([
      { name: 'Jedi starfighter', crew: '1' },
      { name: 'Theta-class T-2c shuttle', crew: '5' },
    ]);
  }
}

class MockScoreService {
  scoreSubject = new BehaviorSubject({ playerOneScore: 1, playerTwoScore: 0 });
  lastWinnerSubject = new BehaviorSubject<ScoreType | null>(null);
  score$ = this.scoreSubject.asObservable();
  lastWinner$ = this.lastWinnerSubject.asObservable();

  resetScore() {
    this.scoreSubject.next({ playerOneScore: 0, playerTwoScore: 0 });
    this.lastWinnerSubject.next(null);
  }

  updateScoresBasedOnAttribute(players: any[], attribute: string) {
    let currentScores = this.scoreSubject.getValue();
    let playerOneIncrement = 0;
    let playerTwoIncrement = 0;

    if (players[0][attribute] > players[1][attribute]) {
      playerOneIncrement = 1;
    } else if (players[0][attribute] < players[1][attribute]) {
      playerTwoIncrement = 1;
    }

    this.scoreSubject.next({
      playerOneScore: currentScores.playerOneScore + playerOneIncrement,
      playerTwoScore: currentScores.playerTwoScore + playerTwoIncrement,
    });
  }
}

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let mockSwapiService: MockSwapiService;
  let mockScoreService: MockScoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, GameboardModule, NoopAnimationsModule],
      declarations: [GameboardComponent],
      providers: [
        { provide: SwapiService, useClass: MockSwapiService },
        { provide: ScoreService, useClass: MockScoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    mockSwapiService = TestBed.inject(SwapiService) as unknown as MockSwapiService;
    mockScoreService = TestBed.inject(ScoreService) as unknown as MockScoreService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set people$ stream when onBattleSetupSelected with people', () => {
    const battleSetup: BattleSetup = { resource: 'people', attribute: 'mass' };
    component.onBattleSetupSelected(battleSetup);
    fixture.detectChanges();
    expect(component.people$).toBeDefined();
  });

  it('should reset score on onScoreResetSelected', () => {
    spyOn(mockScoreService, 'resetScore').and.callThrough();
    component.onScoreResetSelected();
    expect(mockScoreService.resetScore).toHaveBeenCalled();
  });

  it('should update player class names based on the last winner', () => {
    mockScoreService.lastWinnerSubject.next(ScoreType.PLAYER_TWO_SCORE);
    fixture.detectChanges();

    expect(component.playerOneClass).toBe('loser-shadow');
    expect(component.playerTwoClass).toBe('winner-shadow');
  });

  it('should set correct people data stream on onBattleSetupSelected', done => {
    const battleSetup: BattleSetup = { resource: 'people', attribute: 'mass' };
    spyOn(mockSwapiService, 'fetchPeople').and.callThrough();
    component.onBattleSetupSelected(battleSetup);
    fixture.detectChanges();

    component.people$?.subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(mockSwapiService.fetchPeople).toHaveBeenCalled();
      done();
    });
  });

  it('should set correct starships data stream on onBattleSetupSelected', done => {
    const battleSetup: BattleSetup = { resource: 'starships', attribute: 'crew' };
    spyOn(mockSwapiService, 'fetchStarships').and.callThrough();
    component.onBattleSetupSelected(battleSetup);
    fixture.detectChanges();

    component.starships$?.subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(mockSwapiService.fetchStarships).toHaveBeenCalled();
      done();
    });
  });

  it('should reset data streams on onScoreResetSelected', () => {
    component.onScoreResetSelected();
    expect(component.people$).toBeUndefined();
    expect(component.starships$).toBeUndefined();
  });

  it('should update scores based on people data after fetch', done => {
    const peopleData = [
      { name: 'R4-P17', mass: '45' },
      { name: 'Shaak Ti', mass: '57' },
    ];
    const battleSetup: BattleSetup = { resource: 'people', attribute: 'mass' };

    spyOn(mockSwapiService, 'fetchPeople').and.returnValue(of(peopleData));
    spyOn(mockScoreService, 'updateScoresBasedOnAttribute').and.callThrough();

    component.onBattleSetupSelected(battleSetup);
    fixture.detectChanges();

    component.score$.subscribe(score => {
      expect(score.playerOneScore).toEqual(1);
      expect(mockScoreService.updateScoresBasedOnAttribute).toHaveBeenCalledWith(peopleData, 'mass');
      done();
    });
  });
});
