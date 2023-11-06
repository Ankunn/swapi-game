import { TestBed } from '@angular/core/testing';
import { ScoreType } from '../types';
import { ScoreService } from './score.service';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreService);
  });

  it('should be created with initial scores', done => {
    service.score$.subscribe(score => {
      expect(score).toEqual({ playerOneScore: 0, playerTwoScore: 0 });
      done();
    });
  });

  it('should not update scores if players have equal attributes or non-numeric', () => {
    const players = [{ strength: 'unknown' }, { strength: 'unknown' }];

    service.updateScoresBasedOnAttribute(players, 'strength');
    service.score$.subscribe(score => {
      expect(score).toEqual({ playerOneScore: 0, playerTwoScore: 0 });
    });

    service.updateScoresBasedOnAttribute([{ strength: '10' }, { strength: '10' }], 'strength');
    service.score$.subscribe(score => {
      expect(score).toEqual({ playerOneScore: 0, playerTwoScore: 0 });
    });
  });

  it('should increment correct player score', () => {
    const players = [{ strength: '5' }, { strength: '10' }];

    service.updateScoresBasedOnAttribute(players, 'strength');
    service.score$.subscribe(score => {
      expect(score).toEqual({ playerOneScore: 0, playerTwoScore: 1 });
    });
  });

  it('should emit last winner', done => {
    service.updateScoresBasedOnAttribute([{ strength: '5' }, { strength: '10' }], 'strength');

    service.lastWinner$.subscribe(lastWinner => {
      expect(lastWinner).toBe(ScoreType.PLAYER_TWO_SCORE);
      done();
    });
  });

  // it('should reset score', () => {
  //   // Increment score first
  //   service.incrementScore(ScoreType.PLAYER_ONE_SCORE);

  //   // Now reset and test
  //   service.resetScore();
  //   service.score$.subscribe(score => {
  //     expect(score).toEqual({ playerOneScore: 0, playerTwoScore: 0 });
  //   });
  // });
});
