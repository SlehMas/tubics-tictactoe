import { Component, OnInit } from '@angular/core';
import { ResultService } from '../services/result.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  results: any[] = []
  constructor(
    private resultsService: ResultService,
    private gameService: GameService
    ) { 
    this.gameService.changeState('IDLE')
    resultsService.getResults().subscribe(results => {
      this.results = results
      //map data from firebase
      let array = []
      for (const key in results) {
        let obj = results[key]
        array.push(obj)
      }
      this.results = array.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      })
    })
  }

  ngOnInit() {
  }

}
