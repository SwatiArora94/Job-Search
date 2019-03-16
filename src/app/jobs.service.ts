import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Job } from './models/Job.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  $jobResults: Observable<Array<Job>>;
  jobResultBS: BehaviorSubject<Array<Job>>;

  jobResults: Array<Job>;

  constructor(
    private httpService: HttpClient
  ) {
    this.jobResultBS = new BehaviorSubject<Array<Job>>(undefined);
    this.$jobResults = this.jobResultBS.asObservable();
  }

  fetchJobResults(callback: (data) => void) {
    let url: string = "https://api.myjson.com/bins/kez8a";
    let paramMap: Map<string, string> = new Map<string, string>();
    this.httpService.get(url).subscribe((data) => {
      if (data) {
        this.jobResults = (<any>data).jobsfeed;
      }
      callback(data);
    });
  }

  setJobsResultObservable(selectedExperience: string, selectedLocation: string) {
    if (this.jobResults && this.jobResults.length) {
      let results: Array<Job> = [];
      if (selectedExperience && selectedLocation) {
        results = this.jobResults.filter(job => {
          return job.location.includes(selectedLocation) && job.experience.includes(selectedExperience);
        })
      }
      else if (selectedExperience) {
        results = this.jobResults.filter(job => {
          return job.experience.includes(selectedExperience);
        })
      }
      else if (selectedLocation) {
        results = this.jobResults.filter(job => {
          return job.location.includes(selectedLocation);
        })
      }
      this.jobResultBS.next(results);
    }
  }

}
