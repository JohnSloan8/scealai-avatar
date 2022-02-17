import { Component, OnInit, Input } from '@angular/core';
import { sentences, Sentence, /*focussedSentence*/ } from '../sentences'
import { TtsService } from '../tts.service'
import { GramadoirService } from '../gramadoir.service'
import prepareAudioWithGramadoirCheck from '../avatar/three/prepareAudio.js'

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  @Input() sentence!: Sentence;
  audioID: string
  constructor(
    private ttsService:TtsService,
    private gramadoirService:GramadoirService
  ) { 
  }

  ngOnInit(): void {
    this.audioID = "sentAudio" + this.sentence.id
  }

  sentenceEvent = eventType => {
    if (eventType === "blur") {
      this.blurSentence();
    } else if (eventType === "change") {
      this.changeSentence();
    } else if (eventType === "enter") {
      this.enterSentence();
    } else if (eventType === "up") {
      this.arrowSentence(true);
    } else if (eventType === "down") {
      this.arrowSentence(false);
    }
  }

  blurSentence = () => {
    this.sentence.focussed = false;
  }

  changeSentence = () => {
    console.log('in change sentnece')
		//let activeSentence = sentences.filter( s => s.focussed )[0]
    //if ( activeSentence !== undefined ) {
      //activeSentence.focussed = false;
    //}
    //console.log('sentence focussed', this.sentence.id)
    this.sentence.readyToSpeak = false;
  }

  arrowSentence = up => {
    let nextSentenceID;
    let nextSentence;
    if (up) {
      if (!this.firstSentence()) {
        this.sentence.focussed = false;
        nextSentenceID = this.sentence.id - 1
        document.getElementById('sentence_' + nextSentenceID).focus()
      }
    } else {
      if (!this.lastSentence()) {
        this.sentence.focussed = false;
        nextSentenceID = this.sentence.id + 1
        document.getElementById('sentence_' + nextSentenceID).focus()
      }
    }
  }

  lastSentence = () => {
    if (this.sentence.id === sentences.length - 1) {
      return true
    } else {
      return false
    }
  }

  firstSentence = () => {
    if (this.sentence.id === 0) {
      return true
    } else {
      return false
    }
  }

  speakNow = () => {
    if (!this.sentence.awaitingTts && !this.sentence.awaitingGramadoir) {
      this.sentence.readyToSpeak = true;
      prepareAudioWithGramadoirCheck(this.sentence.id)
    }
  }

  enterSentence = () => {
    if ( this.sentence.text !== "" ) {
      this.sentence.awaitingTts = true;
      this.sentence.awaitingGramadoir = true;
	    sentences.map( s => s.readyToSpeak = false)
      this.gramadoirService.getGramadoir(this.sentence.text).subscribe((g) => {
        this.sentence['errors'] = g
        this.sentence.awaitingTts = false;
        this.speakNow()
        console.log('gramadoir.sentence:', this.sentence)
      })
      this.ttsService.getTTS(this.sentence.text).subscribe((tts) => {
        this.sentence['audioData'] = tts
        this.sentence.awaitingGramadoir = false;
        this.speakNow()
        console.log('tts.sentence:', this.sentence)
      })

      this.sentence.focussed = false;
      let nextSentenceID = this.sentence.id + 1 ;
      let nextSentence = document.getElementById('sentence_' + nextSentenceID)
      if ( nextSentence === null ) {
        sentences.push({
          id: nextSentenceID,
          text: "",
          errors: null,
          focussed: false,
          readyToSpeak: false
        })
        setTimeout(function() {
          nextSentence = document.getElementById('sentence_' + nextSentenceID)
          nextSentence.focus()
        }, 100) // give dom time to create new element
      } else {
        nextSentence.focus()
      }
    }
  }

}
