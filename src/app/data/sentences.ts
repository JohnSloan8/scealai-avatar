interface Sentence {
  id: number;
  text: string;
  errors: object[];
  focussed: boolean;
  readyToSpeak: boolean;
  readyToSpeakHelp: boolean;
  awaitingTts: boolean;
  awaitingGramadoir: boolean;
  audioData: object;
  editted: boolean;
}

const sentences = [
]

export { Sentence, sentences, /*focussedSentence*/ }
