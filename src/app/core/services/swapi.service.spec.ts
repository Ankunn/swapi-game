import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MOCK_PEOPLE_DATA, MOCK_STARSHIP_DATA, MOCK_SWAPI_COMMON_RESPONSE } from '../mocks';
import { ResourceType } from '../types';
import { SwapiService } from './swapi.service';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiService],
    });

    service = TestBed.inject(SwapiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('fetchPeople method should retrieve an array of people with properties', () => {
    service.fetchPeople().subscribe(people => {
      expect(people.length).toBe(2);
      expect(people[0].name).toEqual('R4-P17');
      expect(people[1].name).toEqual('Shaak Ti');
    });

    const req = httpTestingController.expectOne('https://swapi.tech/api/people?page=1&limit=100');
    expect(req.request.method).toEqual('GET');
    req.flush({
      results: MOCK_PEOPLE_DATA.map(person => ({ url: person.url })),
    });

    const calls = httpTestingController.match(request => request.url.includes('https://www.swapi.tech/api/people/'));
    expect(calls.length).toBe(2);
    calls[0].flush({ result: { properties: MOCK_PEOPLE_DATA[0] } });
    calls[1].flush({ result: { properties: MOCK_PEOPLE_DATA[1] } });
  });

  it('fetchStarships method should retrieve an array of starships with properties', () => {
    service.fetchStarships().subscribe(starships => {
      expect(starships.length).toBe(2);
      expect(starships[0].name).toEqual('Jedi starfighter');
      expect(starships[1].name).toEqual('Theta-class T-2c shuttle');
    });

    const req = httpTestingController.expectOne('https://swapi.tech/api/starships?page=1&limit=100');
    expect(req.request.method).toEqual('GET');
    req.flush({
      results: MOCK_STARSHIP_DATA.map(starship => ({ url: starship.url })),
    });

    const calls = httpTestingController.match(request => request.url.includes('https://www.swapi.tech/api/starships/'));
    expect(calls.length).toBe(2);
    calls[0].flush({ result: { properties: MOCK_STARSHIP_DATA[0] } });
    calls[1].flush({ result: { properties: MOCK_STARSHIP_DATA[1] } });
  });

  it('should toggle isLoading$ correctly when fetching people', () => {
    let loadingState = false;
    service.isLoading$.subscribe(state => (loadingState = state));

    service.fetchPeople().subscribe();

    const req = httpTestingController.expectOne('https://swapi.tech/api/people?page=1&limit=100');
    expect(loadingState).toBeTrue();
    req.flush({ results: MOCK_PEOPLE_DATA.map(person => ({ url: person.url })) });

    const detailsCalls = httpTestingController.match(request =>
      request.url.includes('https://www.swapi.tech/api/people/')
    );
    detailsCalls.forEach((call, index) => call.flush({ result: { properties: MOCK_PEOPLE_DATA[index] } }));

    expect(loadingState).toBeFalse();
  });

  it('fetchCommonData should fetch data and use cache for subsequent calls', () => {
    const resource: ResourceType = 'people';

    service.fetchCommonData(resource).subscribe(data => {
      expect(data).toEqual(MOCK_SWAPI_COMMON_RESPONSE);
    });

    const req = httpTestingController.expectOne('https://swapi.tech/api/people?page=1&limit=100');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_SWAPI_COMMON_RESPONSE);

    service.fetchCommonData(resource).subscribe(data => {
      expect(data).toEqual(MOCK_SWAPI_COMMON_RESPONSE);
    });
    httpTestingController.expectNone('https://swapi.tech/api/people?page=1&limit=100');
  });

  // it('getTwoRandomPlayers should return an array of two unique URLs', () => {
  //   spyOn(Math, 'random').and.returnValues(0, 0.999);

  //   const urls = service.getTwoRandomPlayers(MOCK_SWAPI_COMMON_RESPONSE);
  //   expect(urls.length).toBe(2);
  //   expect(urls[0]).not.toEqual(urls[1]);
  // });
});
