import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = "http://localhost:1337/api/auth/local"
  constructor(private http:HttpClient) { }

  retrieveToken = () => {
    return this.http.post<any>(this.apiUrl, { 
      "identifier": "testUser",
      "password": "testUserPass1"
    })
  }
}
