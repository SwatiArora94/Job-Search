import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchHomeComponent } from './search-home/search-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'Search', pathMatch: 'full' },
  { path: 'Search', component: SearchHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
