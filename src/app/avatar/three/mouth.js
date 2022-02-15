const TWEEN = require('@tweenjs/tween.js')
import { lenMorphs, head } from './main'
import { updateAvatarState, avatarStates, speakingSpeedMultDict } from './config'
import phonemeToVisemeMap from './phonemeToViseme.js'
import { sentences } from '../../sentences'

let visemeCount = 0
let audio
let activeSentence

const startMouthing = () => {
	console.log('sentences:', sentences)
	activeSentence = sentences.filter( s => s.readyToSpeak )[0]
	console.log('activeSentence:', activeSentence)
	audio = document.getElementById('audio_player_' + activeSentence.id)
	console.log('audio:', audio)
	document.body.appendChild(audio)
	audio.playbackRate = 1
	updateAvatarState('speakingSpeed', 1)
	updateAvatarState('speaking', true)	
	visemeCount = 0;
	audio.play()
	mouthPhrase();
}

const mouthPhrase = () => {
	console.log('a.playbackRate:', audio.playbackRate)
	let dur = 0
	if ( activeSentence.orderedTiming[visemeCount].error && avatarStates.speakingSpeed !== 0.25 ) {
		audio.playbackRate = 0.25
		updateAvatarState('speakingSpeed', 0.25)
	} else if ( !activeSentence.orderedTiming[visemeCount].error  && avatarStates.speakingSpeed !== 1 ){
		audio.playbackRate = 1
		updateAvatarState('speakingSpeed', 1)
	}
	if (visemeCount === 0) {
		dur = parseFloat(activeSentence.orderedTiming[visemeCount].end)*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	} else {
		dur = (parseFloat(activeSentence.orderedTiming[visemeCount].end)-parseFloat(activeSentence.orderedTiming[visemeCount-1].end))*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	}
	mouthViseme("viseme_" + phonemeToVisemeMap[activeSentence.orderedTiming[visemeCount].phone], dur)
}

const mouthViseme = (vis, duration) => {
	let faceMorphsTo = new Array(lenMorphs).fill(0);
	faceMorphsTo[head.morphTargetDictionary[vis]] = 0.4;
	let mouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, duration)
		.easing(TWEEN.Easing.Cubic.In)
		.start()

	mouthingIn.onComplete( function() {
		if (visemeCount < activeSentence.orderedTiming.length-1) {
			visemeCount += 1;
			mouthPhrase()
		} else {
			faceMorphsTo = new Array(lenMorphs).fill(0);
			mouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, 500)
				.easing(TWEEN.Easing.Cubic.InOut)
				.start()
			updateAvatarState('speaking', false)
		}
	})
}

//window.startMouthing = startMouthing
export default startMouthing
