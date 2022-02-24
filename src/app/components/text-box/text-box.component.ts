import { Component, OnInit, Input } from '@angular/core';
import { sentences, Sentence, /*focussedSentence*/ } from '../../data/sentences'
import { TtsService } from '../../services/tts.service'
import { GramadoirService } from '../../services/gramadoir.service'
import { WrittenAttemptService } from '../../services/written-attempt.service'
import prepareAudioWithGramadoirCheck from '../avatar/three/prepareAudio.js'
import { avatarReadyToSpeak } from '../avatar/three/main'
import { avatarLookAt } from '../avatar/three/look'
import { avatarStates } from '../avatar/three/config'
import startMouthing from '../avatar/three/mouth'

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  @Input() sentence!: Sentence;
  audioID: string
  helpAudioID: string
  constructor(
    private ttsService:TtsService,
    private gramadoirService:GramadoirService,
    private writtenAttemptService:WrittenAttemptService,
  ) { 
  }

  ngOnInit(): void {
    this.audioID = "sentAudio" + this.sentence.id
    this.helpAudioID = "helpAudio" + this.sentence.id
  }

  sentenceEndings = ['.', '?', '!']
  onKeyPress = evt => {

    // Enter causes the text to be synthesised and move the cursor to the next line
    if (evt.key === "Enter") {
      evt.preventDefault()
      this.enterSentence()

    // If the user types a . ! or ? at the end of the sentence, we treat it like and Enter
    } else if (this.sentenceEndings.includes(evt.key)) {

      // If there is already a . ! or ? at the end of the sentence, we don't want one more
      if (this.sentenceEndings.includes(this.sentence.text[this.sentence.text.length-1])) {
        evt.preventDefault()
      }
      this.enterSentence()
    } else {

      // on any other key, it will change the sentence and need to be synthesised again when Entered
      if (this.sentence.readyToSpeak) {
          this.sentence.readyToSpeak = false;
      }
    }

  }

  clickSentence = () => {
    
    //reset all sentences so none highlighted
    sentences.map(s => s.readyToSpeak = false)
    this.sentence.focussed = true;

    // only speak a sentence on the following conditions when clicked
    if (this.sentence.audioData !== undefined && !this.sentence.editted && !avatarStates.speaking) {
      this.sentence.readyToSpeak = true
      startMouthing()
    }
  }

  blurSentence = () => {
    this.sentence.focussed = false;
  }

  changeSentence = () => {
    this.sentence.readyToSpeak = false;
    this.sentence.editted = true;
  }

  arrowSentence = up => {
    this.sentence.focussed = false;
    this.sentence.readyToSpeak = false;
    let nextSentenceID;
    let nextSentence;
    if (up) {
      nextSentenceID = this.sentence.id - 1
    } else {
      nextSentenceID = this.sentence.id + 1
    }
    nextSentence = sentences.find(s => s.id === nextSentenceID)
    document.getElementById('sentence_' + nextSentenceID).focus()
    if (nextSentence.audioData !== undefined && !nextSentence.editted && !avatarStates.speaking) {
      nextSentence.readyToSpeak = true
      startMouthing()
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

      // replace stops in text with commas as tts doesn't do them.
      let re = /[\.\?!]/g
      let comma = ", "
      let sentenceWithoutEndStops = this.sentence.text.replace(re, comma)
      this.gramadoirService.getGramadoir(this.sentence.text).subscribe((g) => {
        this.sentence['errors'] = g
        this.sentence.awaitingTts = false;
        this.speakNow()
      })
      this.ttsService.getTTS(sentenceWithoutEndStops).subscribe((tts) => {
        this.sentence['audioData'] = tts
        this.sentence.awaitingGramadoir = false;
        this.speakNow()
      })
      this.writtenAttemptService.sendWrittenAttempt(this.sentence.text).subscribe((swa) => {
        console.log('sendWrittenAttempt:', swa)
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
