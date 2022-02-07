import startMouthing from "./mouth"
import { avatarStates, gramadoirObject } from './config'

var a;
const prepareAudioWithGramadoirCheck = (json, sentId) => {
  a = document.getElementById('audio_player_' + sentId)
  a.setAttribute("src", "data:audio/wav;base64," + json.data.audioContent)

  let orderedTiming = createOrderedTimings(json.data.timing)
  console.log('orderedTiming:', orderedTiming)

  let m = document.getElementById('synth_' + sentId)
  m.addEventListener('click', orderedTimings => {
    startMouthing(a, orderedTiming)
  })
  m.style.visibility = "visible"

}

const createOrderedTimings = t => {
    console.log('gramadoirObject:', gramadoirObject)
    let orderedTimings = []
    let wordOnset = 0
    let errorNo = 0
    let currentlyTrue = false
    t.forEach( word => {
        let errorPhone = false
        if ( word.word !== "SILENCE_TOKEN" ) {
            if ( gramadoirObject.errors[errorNo].fromx <= wordOnset && wordOnset <= gramadoirObject.errors[errorNo].tox ) {
                errorPhone = true
                currentlyTrue = true
            } else {
                errorPhone = false
                if ( currentlyTrue ) {
                    currentlyTrue = false
                    errorNo += 1
                }
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
