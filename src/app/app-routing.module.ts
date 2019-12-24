import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: PlayComponent, pathMatch: 'full', },
  { path: 'results', component: ResultsComponent, pathMatch: 'full', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
