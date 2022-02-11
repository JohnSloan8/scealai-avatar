import { Component, OnInit } from '@angular/core';
import { sentences } from '../sentences'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {

  sentences = sentences;
  constructor() { }

  ngOnInit(): void {
  }

}
