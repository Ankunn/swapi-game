import { Component, Input } from '@angular/core';
import { Labels, PersonProperties, StarshipProperties } from 'src/app/core';

const personLabels: Labels = {
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair Color',
  skin_color: 'Skin Color',
  eye_color: 'Eye Color',
  birth_year: 'Birth Year',
  gender: 'Gender',
};

const starshipLabels: Labels = {
  starship_class: 'Class',
  manufacturer: 'Manufacturer',
  cost_in_credits: 'Cost in Credits',
  length: 'Length',
  crew: 'Crew',
  passengers: 'Passengers',
  max_atmosphering_speed: 'Max Atmosphering Speed',
  hyperdrive_rating: 'Hyperdrive Rating',
  MGLT: 'MGLT',
  cargo_capacity: 'Cargo Capacity',
  consumables: 'Consumables',
};

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent {
  @Input() person?: PersonProperties | null;
  @Input() starship?: StarshipProperties | null;

  createPersonDetailList(person: PersonProperties) {
    return Object.entries(person)
      .map(([key, value]) => ({
        label: personLabels[key],
        value: value,
      }))
      .filter(detail => detail.label != null);
  }

  createStarshipDetailList(starship: StarshipProperties) {
    return Object.entries(starship)
      .map(([key, value]) => ({
        label: starshipLabels[key],
        value: value,
      }))
      .filter(detail => detail.label != null);
  }
}
