import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BattleSetup, CommonAttributeType, Labels, ResourceType } from 'src/app/core';

interface BattleSetupOptions {
  key: string;
  value: ResourceType;
  attributes: CommonAttributeType[];
}

const BATTLE_SETUP_OPTIONS: BattleSetupOptions[] = [
  {
    key: 'People',
    value: 'people',
    attributes: ['height', 'mass'],
  },
  {
    key: 'Starships',
    value: 'starships',
    attributes: [
      'cost_in_credits',
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cargo_capacity',
      'consumables',
      'hyperdrive_rating',
      'MGLT',
    ],
  },
];

const ATTRIBUTE_LABELS: Labels = {
  height: 'Height',
  mass: 'Mass',
  cost_in_credits: 'Cost in Credits',
  length: 'Length',
  max_atmosphering_speed: 'Max Atmosphering Speed',
  crew: 'Crew',
  passengers: 'Passengers',
  cargo_capacity: 'Cargo Capacity',
  consumables: 'Consumables',
  hyperdrive_rating: 'Hyperdrive Rating',
  mglt: 'MGLT',
};

@Component({
  selector: 'app-battle-switcher',
  templateUrl: './battle-switcher.component.html',
  styleUrls: ['./battle-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleSwitcherComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() isLoading: boolean | null = false;
  @Output() battleSetupSelected = new EventEmitter<BattleSetup>();
  @Output() scoreResetSelected = new EventEmitter<void>();

  form: FormGroup;
  battleSetupOptions = BATTLE_SETUP_OPTIONS;
  availableAttributes: { key: string; value: string }[] = [];

  get resource() {
    return this.form.get('resource') as FormControl;
  }

  get attribute() {
    return this.form.get('attribute') as FormControl;
  }

  constructor() {
    this.form = new FormGroup({
      resource: new FormControl(null, Validators.required),
      attribute: new FormControl({ value: null, disabled: true }, Validators.required),
    });

    this.resource.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((resource: ResourceType) => {
      this.updateAvailableAttributes(resource);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.battleSetupSelected.emit(this.form.value as BattleSetup);
    }
  }

  onScoreReset(): void {
    this.form.reset();
    this.resource.setErrors(null);
    this.scoreResetSelected.emit();
  }

  private updateAvailableAttributes(resource: ResourceType): void {
    this.availableAttributes = this.getAttributesForSelectedResource(resource);
    if (this.availableAttributes.length) {
      this.attribute.enable();
      this.attribute.reset();
    } else {
      this.attribute.disable();
    }
  }

  private getAttributesForSelectedResource(resource: ResourceType): { key: string; value: string }[] {
    const selectedOption = this.battleSetupOptions.find(option => option.value === resource);

    if (!selectedOption) {
      return [];
    }

    return selectedOption?.attributes.map(attributeKey => ({
      key: ATTRIBUTE_LABELS[attributeKey] || attributeKey,
      value: attributeKey,
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
