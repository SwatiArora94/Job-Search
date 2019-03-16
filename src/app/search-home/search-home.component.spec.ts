import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomeComponent } from './search-home.component';
import { SearchComponent } from '../search/search.component';
import { ResultsComponent } from '../results/results.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobsService } from '../jobs.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchHomeComponent', () => {
  let component: SearchHomeComponent;
  let fixture: ComponentFixture<SearchHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchHomeComponent, SearchComponent, ResultsComponent],
      imports: [FormsModule, BrowserModule, BrowserAnimationsModule,HttpClientModule],
      providers: [JobsService,HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
