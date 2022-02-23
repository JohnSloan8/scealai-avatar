import { Component, OnInit, Input } from '@angular/core';
import { sentences, Sentence, /*focussedSentence*/ } from '../sentences'
import { TtsService } from '../tts.service'
import { GramadoirService } from '../gramadoir.service'
import { WrittenAttemptService } from '../api/written-attempt.service'
import prepareAudioWithGramadoirCheck from '../avatar/three/prepareAudio.js'
import { avatarReadyToSpeak } from '../avatar/three/main'
import { avatarLookAt } from '../avatar/three/look'
import { avatarStates } from '../avatar/three/config'
import startMouthing from '../avatar/three/mouth'
//import TWEEN from '@tweenjs/tween.js'

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
    private gramadoirService:GramadoirService,
    private writtenAttemptService:WrittenAttemptService,
  ) { 
  }

  ngOnInit(): void {
    this.audioID = "sentAudio" + this.sentence.id
  }

  sentenceEndings = ['.', '?', '!']
  onKeyPress = evt => {
    console.log('key:', evt)
    if (evt.key === "Enter") {
      evt.preventDefault()
      this.enterSentence()
    } else if (this.sentenceEndings.includes(evt.key)) {
      if (this.sentenceEndings.includes(this.sentence.text[this.sentence.text.length-1])) {
        evt.preventDefault()
      }
      console.log('end key pressed')
      this.enterSentence()
    } else {

    if (this.sentence.readyToSpeak) {
        this.sentence.readyToSpeak = false;
    }
    }

  }

  clickSentence = () => {
    sentences.map(s => s.readyToSpeak = false)
    //console.log('this.sentence:', this.sentence)
    this.sentence.focussed = true;
    console.log('audioData:', this.sentence.audioData)
    console.log('editted:', this.sentence.editted)
    console.log('speaking:', avatarStates.speaking)
    if (this.sentence.audioData !== undefined && !this.sentence.editted && !avatarStates.speaking) {
      this.sentence.readyToSpeak = true
      startMouthing()
    }
  }

  blurSentence = () => {
    this.sentence.focussed = false;
  }

  changeSentence = () => {
    //console.log('in change sentence')
		//let activeSentence = sentences.filter( s => s.focussed )[0]
    //if ( activeSentence !== undefined ) {
      //activeSentence.focussed = false;
    //}
    //console.log('sentence focussed', this.sentence.id)
    //if (this.sentenceEndings.includes(this.sentence.text[this.sentence.text.length - 2])) {
    //    this.sentence.text = this.sentence.text.slice(0, this.sentence.text.length - 2) + ','
    //}
    this.sentence.readyToSpeak = false;
    this.sentence.editted = true;
  }

  arrowSentence = up => {
    let nextSentenceID;
    let nextSentence;
    if (up) {
      if (!this.firstSentence()) {
        this.sentence.focussed = false;
        this.sentence.readyToSpeak = false;
        nextSentenceID = this.sentence.id - 1
        let nextSentence = sentences.find(s => s.id === nextSentenceID)
        document.getElementById('sentence_' + nextSentenceID).focus()
        if (nextSentence.audioData !== undefined && !nextSentence.editted && !avatarStates.speaking) {
          nextSentence.readyToSpeak = true
          startMouthing()
        }
      }
    } else {
      if (!this.lastSentence()) {
        this.sentence.focussed = false;
        this.sentence.readyToSpeak = false;
        nextSentenceID = this.sentence.id + 1
        let nextSentence = sentences.find(s => s.id === nextSentenceID)
        document.getElementById('sentence_' + nextSentenceID).focus()
        if (nextSentence.audioData !== undefined && !nextSentence.editted && !avatarStates.speaking) {
          nextSentence.readyToSpeak = true
          startMouthing()
        }
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
      avatarLookAt('camera', 1500 )
    }
  }

  enterSentence = () => {
    if ( this.sentence.text !== "" && !avatarStates.lookingAtBoard && !avatarStates.speaking) {
      this.sentence.editted = false
      avatarLookAt('board', 1500)
      this.sentence.awaitingTts = true;
      this.sentence.awaitingGramadoir = true;
      sentences.map( s => s.readyToSpeak = false)

      let re = /[\.\?!]/g
      let comma = ", "
      let sentenceWithoutEndStops = this.sentence.text.replace(re, comma)
      console.log('sentenceWithoutStops:', sentenceWithoutEndStops) 
      this.gramadoirService.getGramadoir(this.sentence.text).subscribe((g) => {
        this.sentence['errors'] = g
        this.sentence.awaitingTts = false;
        this.speakNow()
        //console.log('gramadoir.sentence:', this.sentence)
      })
      this.ttsService.getTTS(sentenceWithoutEndStops).subscribe((tts) => {
        this.sentence['audioData'] = tts
        this.sentence.awaitingGramadoir = false;
        this.speakNow()
        //console.log('tts.sentence:', this.sentence)
      })
      //this.writtenAttemptService.sendWrittenAttempt(this.sentence.text).subscribe((swa) => {
        //console.log('sendWrittenAttempt:', swa)
      //})

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
