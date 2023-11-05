import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, forkJoin, map, shareReplay, switchMap } from 'rxjs';
import { PersonProperties, StarshipProperties, SwapiCommonResponse } from '../interfaces';
import { ResourceType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private readonly API_URL = 'https://swapi.tech/api/';
  private readonly isLoading = new BehaviorSubject(false);
  private cachedCommonResponse: Map<string, Observable<SwapiCommonResponse>> = new Map();

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchPeople(): Observable<PersonProperties[]> {
    return this.fetchCommonData('people').pipe(
      map(response => this.getTwoRandomPlayers(response)),
      switchMap(peopleUrls => this.fetchDetails<PersonProperties>(peopleUrls)),
      finalize(() => this.isLoading.next(false))
    );
  }

  fetchStarships(): Observable<StarshipProperties[]> {
    return this.fetchCommonData('starships').pipe(
      map(response => this.getTwoRandomPlayers(response)),
      switchMap(starshipUrls => this.fetchDetails<StarshipProperties>(starshipUrls)),
      finalize(() => this.isLoading.next(false))
    );
  }

  private fetchCommonData(resource: ResourceType): Observable<SwapiCommonResponse> {
    this.isLoading.next(true);

    const url = `${this.API_URL}${resource}?page=1&limit=100`;

    if (!this.cachedCommonResponse.has(url)) {
      const response$ = this.http.get<SwapiCommonResponse>(url).pipe(shareReplay(1));

      this.cachedCommonResponse.set(url, response$);
    }

    return this.cachedCommonResponse.get(url)!;
  }

  private fetchDetails<T>(urls: string[]): Observable<T[]> {
    return forkJoin(
      urls.map(url =>
        this.http.get<{ result: { properties: T } }>(url).pipe(map(response => response.result.properties))
      )
    ).pipe(map(details => details.filter(detail => detail !== null)));
  }

  private getTwoRandomPlayers(response: SwapiCommonResponse): string[] {
    const availableNumbers = response.results.length;
    const randomNumbers = [Math.floor(Math.random() * availableNumbers), Math.floor(Math.random() * availableNumbers)];
    const players = [response.results[randomNumbers[0]].url, response.results[randomNumbers[1]].url];

    return players;
  }
}
