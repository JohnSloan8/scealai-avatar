import startMouthing from "./mouth"
import { avatarStates, gramadoirObject } from './config'
import { sentences } from '../../sentences'

var a;
const prepareAudioWithGramadoirCheck = (json, sentId) => {
  a = document.getElementById('audio_player_' + sentId)
  if (a === null) {
    let audioParent = document.getElementById('audioElements')
    a = document.createElement('audio')
    a.id = 'audio_player_' + sentId
    audioParent.appendChild(a)
  }
  a.setAttribute("src", "data:audio/wav;base64," + json.audioContent)

  sentences[sentId].orderedTiming = createOrderedTimings(json.timing)

  //let m = document.getElementById('synth_' + sentId)
  //m.addEventListener('click', orderedTimings => {
    //startMouthing(a, orderedTiming)
  //})
  //m.style.visibility = "visible"

}

const createOrderedTimings = t => {
    console.log('gramadoirObject:', gramadoirObject)
    let orderedTimings = []
    let wordOnset = 0
    let errorNo = 0
    let currentlyTrue = false
    t.forEach( word => {
        //let errorPhone = false
        //if ( word.word !== "SILENCE_TOKEN" ) {
            //if ( gramadoirObject.errors[errorNo].fromx <= wordOnset && wordOnset <= gramadoirObject.errors[errorNo].tox ) {
                //errorPhone = true
                //currentlyTrue = true
            //} else {
                //errorPhone = false
                //if ( currentlyTrue ) {
                    //currentlyTrue = false
                    //errorNo += 1
                //}
            //}
            word.phones.forEach(p => {
                //p.error = errorPhone
                orderedTimings.push(p)
            })
            //wordOnset += word.word.length + 1
        //}
    })
    return orderedTimings
}

export default prepareAudioWithGramadoirCheck
