import { Component } from '@angular/core';
import { TokenService } from './api/token.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  constructor(
    private tokenService:TokenService
  ) { 
  }

  ngOnInit(): void {
    console.log('starting...')
    localStorage.setItem('token', '')
    setTimeout(() => {
//      this.tokenService.retrieveToken().subscribe((t) => {
//        console.log('token:', t.jwt)
//        localStorage.setItem('token', t.jwt)
//      })
    }, 2000)
  }

}
