import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatBadgeModule],
      declarations: [ScoreboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a default score when no input is provided', () => {
    expect(component.score).toBeUndefined();
  });

  it('should update the display when score input is provided', () => {
    const testScore = { playerOneScore: 3, playerTwoScore: 2 };
    component.score = testScore;
    fixture.detectChanges();

    expect(component.score).toEqual(testScore);
  });
});
