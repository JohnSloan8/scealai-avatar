const TWEEN = require('@tweenjs/tween.js')
import { lenMorphs, head } from './main'
//import { a } from './prepareAudio'
import { updateAvatarState, avatarStates, speakingSpeedMultDict } from './config'
import phonemeToVisemeMap from './phonemeToViseme.js'
import { sentences } from '../../sentences'

let visemeCount = 0
let activeSentence
let a
const startMouthing = () => {
	updateAvatarState('speaking', true)
	activeSentence = sentences.find(s => s.readyToSpeak)
	if (activeSentence !== undefined) {
		a = document.getElementById('sentAudio' + activeSentence.id)
		visemeCount = 0;
		a.play()
		mouthPhrase();
	} else {
		console.log('activeSentence undefined')
	}
}

const mouthPhrase = () => {
	let dur = 0
	if (visemeCount === 0) {
		dur = parseFloat(activeSentence.orderedTiming[visemeCount].end)*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	} else {
		dur = (parseFloat(activeSentence.orderedTiming[visemeCount].end)-parseFloat(activeSentence.orderedTiming[visemeCount-1].end))*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	}

	if ( activeSentence.orderedTiming[visemeCount].error && avatarStates.speakingSpeed !== 0.25 ) {
		a.pause();
		a.playbackRate = 0.25
		updateAvatarState('speakingSpeed', 0.25)
		setTimeout( () => {
			mouthViseme("viseme_" + phonemeToVisemeMap[activeSentence.orderedTiming[visemeCount].phone], dur)
			a.play()
		}, 250 )
	} else if ( !activeSentence.orderedTiming[visemeCount].error  && avatarStates.speakingSpeed !== 1 ){
		a.pause();
		a.playbackRate = 1
		updateAvatarState('speakingSpeed', 1)
		setTimeout( () => {
			mouthViseme("viseme_" + phonemeToVisemeMap[activeSentence.orderedTiming[visemeCount].phone], dur)
			a.play()
		}, 250 )
	} else {
		mouthViseme("viseme_" + phonemeToVisemeMap[activeSentence.orderedTiming[visemeCount].phone], dur)
	}
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
			let lastMouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, 500)
				.easing(TWEEN.Easing.Cubic.InOut)
				.start()
			lastMouthingIn.onComplete( function() {

				a.playbackRate = 1
				updateAvatarState('speakingSpeed', 1)
				updateAvatarState('speaking', false)
				activeSentence.readyToSpeak = false;
			})
		}
	})
}

//window.startMouthing = startMouthing
export default startMouthing
