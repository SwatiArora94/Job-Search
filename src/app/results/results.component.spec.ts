import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { Job } from '../models/Job.model';
import { JobsService } from '../jobs.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      imports: [FormsModule, BrowserModule, BrowserAnimationsModule,HttpClientModule],
      providers:[JobsService,HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no data if no data exists', () => {
    component.displayJobResults = [];
    expect(component.noJobData==true).toBeTruthy();
  });

  it('should sort jobs by location', () => {
    let jobs = [];
    let SORT_BY_LOCATION = 1;
    let job = new Job();
    job.location = 'Hyderabad';
    jobs.push(job);
    job = new Job();
    job.location = 'Aurangabad';
    jobs.push(job);
    job = new Job();
    job.location = 'Vellore';
    jobs.push(job);
    job = new Job();
    job.location = 'Mumbai';
    jobs.push(job);
    job = new Job();
    job.location = 'Gurugram';
    jobs.push(job);
    component.displayJobResults = jobs;
    component.sortJobs(SORT_BY_LOCATION, true);
    expect((component.displayJobResults[0].location == 'Aurangabad')
      && (component.displayJobResults[1].location == 'Gurugram')
      && (component.displayJobResults[2].location == 'Hyderabad')
      && (component.displayJobResults[3].location == 'Mumbai')
      && (component.displayJobResults[4].location == 'Vellore'))
      .toBeTruthy();
  });

  it('should sort jobs by experience', () => {
    let jobs = [];
    let SORT_BY_EXPERIENCE = 2;
    let job = new Job();
    job.experience = '0-2 yrs';
    jobs.push(job);
    job = new Job();
    job.experience = '5-7 yrs';
    jobs.push(job);
    job = new Job();
    job.experience = '3-4 yrs';
    jobs.push(job);
    component.displayJobResults = jobs;
    component.sortJobs(SORT_BY_EXPERIENCE, true);
    expect((component.displayJobResults[0].experience == '0-2 yrs')
      && (component.displayJobResults[1].experience == '3-4 yrs')
      && (component.displayJobResults[2].experience == '5-7 yrs'))
      .toBeTruthy();
  });

  it('should filter jobs by entered value', () => {
    let jobs = [];
    let job = new Job();
    job.companyname = 'Enuke';
    jobs.push(job);
    job = new Job();
    job.title = 'Software Engineer';
    jobs.push(job);
    job = new Job();
    job.skills = 'Encouraging';
    jobs.push(job);
    component.filterJobs("En");
    component.displayJobResults = jobs;
    expect((component.displayJobResults.findIndex((job: Job) => job.companyname == 'Enuke') != -1)
      || (component.displayJobResults.findIndex((job: Job) => job.title == 'Software Engineer') != -1)
      || (component.displayJobResults.findIndex((job: Job) => job.skills == 'Encouraging') != -1)
    ).toBeTruthy();
  });


});
