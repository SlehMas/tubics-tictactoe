import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private gameState = new BehaviorSubject('GAME_STARTED')
    private _winner = new BehaviorSubject(undefined)

    constructor() {
    }

    get state() {
        return this.gameState.asObservable()
    }
    get winner() {
        return this._winner.asObservable()
    }
    setWinner(winner) {
        this._winner.next(winner)
    }
    changeState(state: string) {
        this.gameState.next(state)
    }
}
