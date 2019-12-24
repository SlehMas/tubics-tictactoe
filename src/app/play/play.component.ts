import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  state: string
  player1: string = 'X'
  player2: string = 'O'
  winner: string
  

  constructor(private gameService: GameService) { 
  }

  ngOnInit() {
    this.gameService.state.subscribe(_state => {
      this.state = _state
    })
  }

  changeState (state: string) {
    this.gameService.changeState(state)
  }

}
