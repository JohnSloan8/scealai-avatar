const TWEEN = require('@tweenjs/tween.js')
import { lenMorphs, head } from './main'
import { speaking } from '../../quill-editor/utils'
let randomViseme
let faceMorphsTo
let randomMouthingDuration
let mouthingIn
export default function mouth() {
		randomViseme =  getRandomViseme();
		faceMorphsTo = new Array(lenMorphs).fill(0);
		randomMouthingDuration = 100 + Math.random()*250
		faceMorphsTo[head.morphTargetDictionary[randomViseme]] = 1

		mouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, randomMouthingDuration)
			.easing(TWEEN.Easing.Cubic.InOut)
			.start()

		mouthingIn.onComplete( function() {
			if (speaking) {
				mouth()
			} else {
				faceMorphsTo = new Array(lenMorphs).fill(0);
				mouthingIn = new TWEEN.Tween(head.morphTargetInfluences).to(faceMorphsTo, randomMouthingDuration)
					.easing(TWEEN.Easing.Cubic.InOut)
					.start()

			}
		})
}

const mouthedVisemes = ['viseme_FF', 'viseme_SS ', 'viseme_kk', 'viseme_E', 'viseme_sil', 'viseme_TH']
function getRandomViseme() {
	let vis = mouthedVisemes[Math.floor(Math.random()*mouthedVisemes.length)]
	return vis
}
window.mouth = mouth
