import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ResultService {

    serviceUrl: string = 'https://tubics-tictactoe.firebaseio.com/result.json'
    constructor(private http: HttpClient) {
    }

    getResults () {
        return this.http.get<any>(this.serviceUrl).pipe(map(results => {
            return results;
        }));
    }
    saveResults (resultObj) {
        return this.http.post<any>(this.serviceUrl, resultObj).pipe(map(data => {
            return data;
        }));
    }

    
}
