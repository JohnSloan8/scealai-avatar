const avatarStates = {
	speaking: false,
	blinking: false,
	speakingSpeed: 1
}

const updateAvatarState = (state, value) => {
	avatarStates[state] = value
}

const speakingSpeedMultDict = {
	1.25: 825,
	1: 850,
	0.75: 875,
	0.5: 920,
	0.25: 925,
	0.2: 926,
	0.15: 927,
	0.1: 928
}

const starToSpeed = {
	1: 0.25,
	2: 0.5,
	3: 0.75,
	4: 1,
	5: 1.25
}

const gramadoirObject = {
	errors: [
		{
			fromx: 8,
			tox: 15,
			errortext: "mo cónaí"
		},
		{
			fromx: 57,
			tox: 66,
			errortext: "i coláiste"
		},
	]
}

module.exports = { updateAvatarState, avatarStates, speakingSpeedMultDict, gramadoirObject }
