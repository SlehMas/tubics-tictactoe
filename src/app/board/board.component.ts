import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../services/game.service';
import { ResultService } from '../services/result.service';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  player1: string;
  @Input()
  player2: string;
  @Output()
  gameEnded: EventEmitter<any> = new EventEmitter<any>();

  isPlayer1Turn: boolean = true;
  state: string;
  winCombos: any;
  cellsLeft: number;
  player1Moves: Array<number> = [];
  player2Moves: Array<number> = [];
  winner: string;

  constructor(private gameService: GameService,
    private resultsService: ResultService) {
    this.winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    this.cellsLeft = 9
  }

  ngOnInit() {
    this.gameService.state.subscribe(_state => {
      this.state = _state
    })
    this.gameService.winner.subscribe(_winner => {
      this.winner = _winner
      if (this.winner == this.player1) this.saveResults(this.player1)
      else if (this.winner == this.player1) this.saveResults(this.player1)
      else {
        this.saveResults('T')
      }
    })
  }

  switchTurn() {
    this.isPlayer1Turn = !this.isPlayer1Turn
  }

  fillCell(event) {
    let cell = event.target
    if (this.state != 'GAME_ENDED') {
      let cellIsEmpty = !cell.classList.contains('hasX') && !cell.classList.contains('hasO')
      if (cellIsEmpty) {
        if (this.isPlayer1Turn) {
          cell.classList.add('hasX')
          this.player1Moves.push(parseInt(cell.id))
        } else {
          cell.classList.add('hasO')
          this.player2Moves.push(parseInt(cell.id))
        }
        this.switchTurn()
        cell.disabled = true
        this.cellsLeft -= 1

        if (this.cellsLeft < 1) {
          this.checkWinner()
          this.declareWinner(undefined)
        }
        //winning move
        this.checkWinner()
      }
    }
  }

  checkWinner() {
    this.winCombos.forEach((element: Array<number>, index) => {
      if (element.every((item) => this.player1Moves.indexOf(item) !== -1)) {
        this.declareWinner(this.player1)
        this.drawStrikeThrough(index)
        return
      }
      if (element.every(item => this.player2Moves.indexOf(item) !== -1)) {
        this.declareWinner(this.player2)
        this.drawStrikeThrough(index)
        return
      }
    })
  }

  drawStrikeThrough(index) {
    let strikethrough = document.getElementById('strikethrough')
    strikethrough.classList.add(`strikethrough_${index}`)
  }

  restartGame() {
    console.log(this.winner == undefined)
    this.gameService.changeState('GAME_STARTED')
    this.gameService.setWinner(undefined)
    this.player1Moves = []
    this.player2Moves = []
    this.cleanBoard()
    this.cellsLeft = 9
  }
  reset () {
    this.restartGame()
    this.gameService.changeState('IDLE')
  }

  cleanBoard() {
    // Loop through all cells and clean them
    for (let i = 0; i < 9; i++) {
      let cell = document.getElementById(`${i}`)
      cell.classList.contains('hasX') && cell.classList.remove('hasX')
      cell.classList.contains('hasO') && cell.classList.remove('hasO')
    }
    // Remove positioning css
    document.getElementById('strikethrough').className = ''
  }

  declareWinner(player?: string) {
    this.gameService.setWinner(player);
    this.gameService.changeState('GAME_ENDED')
  }

  saveResults (result: string) {
    let date = new Date()

    // i did not want to install moment.js
    this.resultsService.saveResults({
      'date': `${date.getMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`,
      'player1': this.player1,
      'player2': this.player2,
      'result': result
    }).subscribe(data => {})
  }
}
