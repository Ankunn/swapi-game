import { SwapiCommonResult } from './swapi-common-result.interface';

export interface SwapiCommonResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: null;
  next: null;
  results: SwapiCommonResult[];
}
