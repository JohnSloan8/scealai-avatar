const TWEEN = require('@tweenjs/tween.js')
import { lenMorphs, head } from './main'
import { updateAvatarState, avatarStates, speakingSpeedMultDict } from './config'
import phonemeToVisemeMap from './phonemeToViseme.js'

let visemeCount = 0
let timing = []
let audio

const startMouthing = (a, newTiming) => {
	audio = a
	audio.playbackRate = 0.75
	updateAvatarState('speakingSpeed', 0.75)
	updateAvatarState('speaking', true)
	timing = newTiming;
	visemeCount = 0;
	audio.play()
	mouthPhrase();
}

const mouthPhrase = () => {
	console.log('a.playbackRate:', audio.playbackRate)
	let dur = 0
	if ( timing[visemeCount].error && avatarStates.speakingSpeed !== 0.25 ) {
		audio.playbackRate = 0.25
		updateAvatarState('speakingSpeed', 0.25)
		console.log('timing[visemeCount]:', timing[visemeCount])
	} else if ( !timing[visemeCount].error  && avatarStates.speakingSpeed !== 0.75 ){
		audio.playbackRate = 0.75
		updateAvatarState('speakingSpeed', 0.75)
	}
	if (visemeCount === 0) {
		dur = parseFloat(timing[visemeCount].end)*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	} else {
		dur = (parseFloat(timing[visemeCount].end)-parseFloat(timing[visemeCount-1].end))*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	}
	mouthViseme("viseme_" + phonemeToVisemeMap[timing[visemeCount].phone], dur)
}

const mouthViseme = (vis, duration) => {
	let faceMorphsTo = new Array(lenMorphs).fill(0);
	faceMorphsTo[head.morphTargetDictionary[vis]] = 0.5;
	let mouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, duration)
		.easing(TWEEN.Easing.Cubic.In)
		.start()

	mouthingIn.onComplete( function() {
		if (visemeCount < timing.length-1) {
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
