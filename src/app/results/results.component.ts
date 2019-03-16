import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Subscription } from 'rxjs';
import { Job } from '../models/Job.model';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  jobResults: Array<Job> = [];
  displayJobResults: Array<Job> = [];
  filterValue: string;
  noJobData: boolean;
  sortedBy: number;

  SORT_BY_LOCATION = 1;
  SORT_BY_EXPERIENCE = 2;

  jobSubscription: Subscription = null;

  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit() {
    this.jobSubscription = this.jobService.$jobResults.subscribe((data) => {
      if (data) {
        this.jobResults = data;
        this.displayJobResults = JSON.parse(JSON.stringify(this.jobResults));
      }
      if (!this.displayJobResults || !this.displayJobResults.length) {
        this.noJobData = true;
      }
      else {
        this.noJobData = false;
      }
    })
  }

  sortJobs(sortValue: number, allowToggle: boolean) {
    if (allowToggle) {
      if (this.sortedBy == sortValue) {
        this.sortedBy = undefined
      }
      else if (this.sortedBy != sortValue) {
        this.sortedBy = sortValue
      }
    }
    if (this.sortedBy && this.displayJobResults) {
      this.displayJobResults = this.displayJobResults.sort((job1: Job, job2: Job) => {
        if (sortValue == this.SORT_BY_LOCATION) {
          if (!job1.location) {
            return 1;
          }
          else if (!job2.location) {
            return -1;
          }
          return (job1.location.trim().toLowerCase().localeCompare(job2.location.trim().toLowerCase()));
        }
        else {
          if (!job1.experience || job2.experience == 'Fresher') {
            return 1;
          }
          else if (!job2.experience || job1.experience == 'Fresher') {
            return -1;
          }
          return (parseInt(job1.experience) - parseInt(job2.experience));
        }
      })
    } else if (allowToggle) {
      this.displayJobResults = JSON.parse(JSON.stringify(this.jobResults));
    }
  }

  // filters jobs on the basis title, skills or company
  filterJobs(value: string) {
    this.filterValue = value.trim().toLowerCase();
    if (!this.filterValue || this.filterValue == '') {
      this.displayJobResults = JSON.parse(JSON.stringify(this.jobResults));
    }
    else {
      this.displayJobResults = this.jobResults.filter((job: Job) => {
        if ((job.skills && job.skills.trim().toLowerCase().includes(this.filterValue))
          || (job.title && job.title.trim().toLowerCase().includes(this.filterValue))
          || (job.companyname && job.companyname.trim().toLowerCase().startsWith(this.filterValue))
        ) {
          return true;
        }
        return false;
      });
    }
    if (!this.displayJobResults || !this.displayJobResults.length) {
      this.noJobData = true;
    }
    else {
      this.noJobData = false;
      this.sortJobs(this.sortedBy, false);
    }
  }

  ngOnDestroy() {
    if (this.jobSubscription) {
      this.jobSubscription.unsubscribe();
    }
  }
}
