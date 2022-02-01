import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaking-speed',
  templateUrl: './speaking-speed.component.html',
  styleUrls: ['./speaking-speed.component.css']
})
export class SpeakingSpeedComponent implements OnInit {
  starRating = 4;
  //currentRate = 3.14;

  constructor() { }

  ngOnInit(): void {
  }

}
