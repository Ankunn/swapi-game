import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSwitcherComponent } from './battle-switcher.component';

describe('BattleSwitcherComponent', () => {
  let component: BattleSwitcherComponent;
  let fixture: ComponentFixture<BattleSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
