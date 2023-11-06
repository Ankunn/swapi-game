import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BattleSwitcherComponent } from './battle-switcher.component';

describe('BattleSwitcherComponent', () => {
  let component: BattleSwitcherComponent;
  let fixture: ComponentFixture<BattleSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, NoopAnimationsModule],
      declarations: [BattleSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with two controls', () => {
    expect(!!component.form.controls['resource']).toBe(true);
    expect(!!component.form.controls['attribute']).toBe(true);
  });

  it('should not allow submission if form is invalid', () => {
    spyOn(component.battleSetupSelected, 'emit');
    component.onSubmit();
    expect(component.battleSetupSelected.emit).not.toHaveBeenCalled();
  });

  it('should emit battle setup on valid submission', () => {
    spyOn(component.battleSetupSelected, 'emit');
    component.form.get('resource')?.setValue('people');
    component.form.get('attribute')?.setValue('mass');
    component.onSubmit();
    expect(component.battleSetupSelected.emit).toHaveBeenCalledWith({
      resource: 'people',
      attribute: 'mass',
    });
  });

  it('should reset form and emit score reset on reset', () => {
    spyOn(component.scoreResetSelected, 'emit');
    component.onScoreReset();
    expect(component.scoreResetSelected.emit).toHaveBeenCalled();
    expect(component.form.get('resource')?.value).toBeNull();
    expect(component.form.get('attribute')?.value).toBeNull();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
