import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SearchHomeComponent } from './search-home/search-home.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { JobsService } from './jobs.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        SearchHomeComponent,
        SearchComponent,
        ResultsComponent
      ],
      providers: [JobsService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
