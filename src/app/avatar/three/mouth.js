const TWEEN = require('@tweenjs/tween.js')
import { lenMorphs, head } from './main'
import { updateAvatarState, avatarStates, speakingSpeedMultDict } from './config'
import phonemeToVisemeMap from './phonemeToViseme.js'

let visemeCount = 0
let timing = []

const startMouthing = newTiming => {
	updateAvatarState('speaking', true)
	timing = newTiming;
	console.log('timing:', timing)
	visemeCount = 0;
	mouthPhrase();
}

const mouthPhrase = () => {
	let dur = 0
	console.log('timing:', timing)
	if (visemeCount === 0) {
		dur = parseFloat(timing[visemeCount].end)*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	} else {
		dur = (parseFloat(timing[visemeCount].end)-parseFloat(timing[visemeCount-1].end))*speakingSpeedMultDict[avatarStates.speakingSpeed] / avatarStates.speakingSpeed
	}
	mouthViseme("viseme_" + phonemeToVisemeMap[timing[visemeCount].phone], dur)
}

const mouthViseme = (vis, duration) => {
	console.log('vis:', vis)
	let faceMorphsTo = new Array(lenMorphs).fill(0);
	faceMorphsTo[head.morphTargetDictionary[vis]] = 1;
	let mouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, duration)
		.easing(TWEEN.Easing.Cubic.In)
		.start()

	mouthingIn.onComplete( function() {
		if (visemeCount < timing.length-1) {
			visemeCount += 1;
			mouthPhrase()
		} else {
			//faceMorphsTo = new Array(lenMorphs).fill(0);
			//mouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, randomMouthingDuration)
				//.easing(TWEEN.Easing.Cubic.InOut)
				//.start()
			console.log('mouthing ended:', visemeCount)
			console.log('finalVis:', vis)
			updateAvatarState('speaking', false)
		}
	})
}

//window.startMouthing = startMouthing
export default startMouthing
