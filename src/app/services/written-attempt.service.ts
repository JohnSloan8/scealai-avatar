import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WrittenAttemptService {
  //private apiUrl = "https://warm-reef-17230.herokuapp.com/api/v1/getIrishGramadoirCheck"
  private apiUrl = "http://localhost:1337/api/written-attempts"
  constructor(private http:HttpClient) { }

  sendWrittenAttempt = text => {
    return this.http.post<any>(this.apiUrl, {"data": {"text": text }})
  }

}
