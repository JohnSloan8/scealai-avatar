import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { sentences } from './sentences'

@Injectable({
  providedIn: 'root'
})

export class TtsService {
  private apiUrl = "https://warm-reef-17230.herokuapp.com/api/v1/getIrishSynthesis"
  //private apiUrl = "http://localhost:5000/api/v1/getIrishSynthesis"
  constructor(private http:HttpClient) { }

  getTTS = text => {
    return this.http.post<any>(this.apiUrl, { "text": text })
  }
}
