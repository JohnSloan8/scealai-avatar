import { Component, OnInit } from '@angular/core';
import { 
  faMicrophone,
  faVolumeUp,
  faMeh
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-audio-buttons',
  templateUrl: './audio-buttons.component.html',
  styleUrls: ['./audio-buttons.component.css']
})
export class AudioButtonsComponent implements OnInit {

  faMicrophone = faMicrophone
  faVolumeUp = faVolumeUp
  faMeh = faMeh
  constructor() { }

  ngOnInit(): void {
  }

}
