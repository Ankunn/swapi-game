import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_PEOPLE_DATA, MOCK_STARSHIP_DATA } from 'src/app/core';
import { PlayerInfoComponent } from './player-info.component';

describe('PlayerInfoComponent', () => {
  let component: PlayerInfoComponent;
  let fixture: ComponentFixture<PlayerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create detail list for person input', () => {
    component.person = MOCK_PEOPLE_DATA[0];
    const details = component.createPersonDetailList(component.person);

    const partialDetails = details.slice(0, 3);

    expect(partialDetails).toEqual([
      { label: 'Height', value: '96' },
      { label: 'Mass', value: 'unknown' },
      { label: 'Hair Color', value: 'none' },
    ]);
  });

  it('should create detail list for starship input', () => {
    component.starship = MOCK_STARSHIP_DATA[0];
    const details = component.createStarshipDetailList(component.starship);

    const partialDetails = details.slice(0, 3);

    expect(partialDetails).toEqual([
      { label: 'Model', value: 'Delta-7 Aethersprite-class interceptor' },
      { label: 'Class', value: 'Starfighter' },
      { label: 'Manufacturer', value: 'Kuat Systems Engineering' },
    ]);
  });

  it('should filter out person properties with undefined labels', () => {
    component.person = MOCK_PEOPLE_DATA[0];
    const details = component.createPersonDetailList(component.person);
    const unknownDetail = details.find(detail => detail.label === 'unknownProp');

    expect(unknownDetail).toBeUndefined();
  });

  it('should filter out starship properties with undefined labels', () => {
    component.starship = MOCK_STARSHIP_DATA[0];
    const details = component.createStarshipDetailList(component.starship);
    const unknownDetail = details.find(detail => detail.label === 'unknownProp');

    expect(unknownDetail).toBeUndefined();
  });
});
