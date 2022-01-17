import { Component, OnInit } from '@angular/core';
import { 
  faPencilAlt,
  faDownload,
  faCommentDots,
  faBook,
  faVolumeUp,
  faSpellCheck,
  faMicrophone
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  faPencilAlt = faPencilAlt
  faDownload = faDownload
  faCommentDots = faCommentDots
  faBook = faBook
  faVolumeUp = faVolumeUp
  faSpellCheck = faSpellCheck
  faMicrophone = faMicrophone

  constructor() { }

  ngOnInit(): void {
  }

}
