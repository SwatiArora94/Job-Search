import { TestBed } from '@angular/core/testing';

import { JobsService } from './jobs.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('JobsService', () => {
  let jobService:JobsService
  beforeEach(() => {
    let http:HttpClient
    jobService=new JobsService(http);
    TestBed.configureTestingModule({
    imports:[HttpClientModule],
    providers:[JobsService]
  })}
  );

  it('should be created', () => {
    const service: JobsService = TestBed.get(JobsService);
    expect(service).toBeTruthy();
  });

  it('$jobResults should return value from observable',
    (done: DoneFn) => {
    jobService.$jobResults.subscribe(value => {
      expect(value==undefined).toBeTruthy();
      done();
    });
  });


});
