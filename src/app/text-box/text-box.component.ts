import { Component, OnInit, Input } from '@angular/core';
import { sentences, Sentence, /*focussedSentence*/ } from '../sentences'

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  @Input() sentence!: Sentence;

  constructor() { }

  ngOnInit(): void {
  }

  sentenceEvent = eventType => {
    if (eventType === "blur") {
      this.blurSentence();
    } else if (eventType === "focus") {
      this.focusSentence();
    } else if (eventType === "enter") {
      this.enterSentence();
    }
  }

  blurSentence = () => {
    console.log('sentence blurred', this.sentence.id)
    this.sentence.readyToSpeak = true;
    this.sentence.focussed = false;
    sentences.map(s => {
      if (s !== this.sentence) {
        s.readyToSpeak = false;
      }
    })
  }

  focusSentence = () => {
    console.log('sentence focussed', this.sentence.id)
    this.sentence.readyToSpeak = false;
    this.sentence.focussed = true;
  }

  enterSentence = () => {
    console.log('sentence entered:', this.sentence.id)
    this.sentence.readyToSpeak = true;
    this.sentence.focussed = false;
  }

  submitSentence = () => {

  }

}
