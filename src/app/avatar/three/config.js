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
	0.25: 925
}

const starToSpeed = {
	1: 0.25,
	2: 0.5,
	3: 0.75,
	4: 1,
	5: 1.25
}

module.exports = { updateAvatarState, avatarStates, speakingSpeedMultDict }
