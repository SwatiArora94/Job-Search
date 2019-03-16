import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Job } from '../models/Job.model';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  experienceOptions: Array<any> = [
    { value: '-1', label: '--Select Experience--' }
  ];
  locationOptions: Array<any> = [
    { value: '-1', label: '--Select Location--' }
  ];

  selectedExperience: string = "-1";
  selectedLocation: string = "-1";

  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit() {
    this.jobService.fetchJobResults((data) => {
      if (data) {
        let jobs: Array<Job> = (<any>data).jobsfeed;
        if (jobs && jobs.length) {
          let experiences = {};
          let locations = {};
          for (let job of jobs) {
            if (job.experience) {
              experiences[job.experience] = job.experience;
            }
            if (job.location) {
              // splitting multiple locations
              let splitArr = [];
              if (job.location.includes(',')) {
                splitArr = job.location.split(',');
              }
              else {
                splitArr = job.location.split('/');
              }
              for (let location of splitArr) {
                locations[location] = location;
              }
              if (locations['Bangalore'] && locations['Bengaluru']) {
                delete locations['Bangalore'];
              }
            }
          }
          for (let expValue in experiences) {
            this.experienceOptions.push({ value: expValue + '', label: expValue + '' });
          }
          for (let locValue in locations) {
            this.locationOptions.push({ value: locValue + '', label: locValue + '' });
          }
        }
      }
    });
  }

  onExperienceChange(event) {
    this.selectedExperience = event.value;
  }
  onLocationChange(event) {
    this.selectedLocation = event.value;
  }

  onSearchClick() {
    if (this.selectedExperience != "-1" || this.selectedLocation != "-1") {
      this.jobService.setJobsResultObservable(this.selectedExperience != "-1" ? this.selectedExperience : undefined, this.selectedLocation != "-1" ? this.selectedLocation : undefined);
    }
  }

}
