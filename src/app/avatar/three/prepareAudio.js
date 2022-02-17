import { updateAvatarState, avatarStates, gramadoirObject } from './config'
import { sentences } from '../../sentences'

var a;
const prepareAudioWithGramadoirCheck = sentId => {
  sentences[sentId].orderedTiming = createOrderedTimings(sentId)
  a = document.getElementById('sentAudio' + sentId)
  a.setAttribute("src", "data:audio/wav;base64," + sentences[sentId].audioData.audioContent)
	a.playbackRate = 0.75
	updateAvatarState('speakingSpeed', 0.75)
	updateAvatarState('speaking', true)	
	updateAvatarState('activeSentence', sentId)	
  a.load()
}

const createOrderedTimings = (sentID) => {
    let orderedTimings = []
    let wordOnset = 0
    let errorNo = 0
    let currentlyTrue = false
    sentences[sentID].audioData.timing.forEach( word => {
        let errorPhone = false
        if ( word.word !== "SILENCE_TOKEN" ) {
          if (errorNo < sentences[sentID].errors.length) {
            if ( sentences[sentID].errors[errorNo].fromx <= wordOnset && wordOnset <= sentences[sentID].errors[errorNo].tox ) {
                errorPhone = true
                currentlyTrue = true
            } else {
                errorPhone = false
                if ( currentlyTrue ) {
                    currentlyTrue = false
                    errorNo += 1
                }
            }
          } else {
            errorPhone = false;
            currentlyTrue = false
          }
          word.phones.forEach(p => {
              p.error = errorPhone
              orderedTimings.push(p)
          })
          wordOnset += word.word.length + 1
        }
    })
    return orderedTimings
}

export default prepareAudioWithGramadoirCheck
export { a }
