interface Sentence {
  id: number;
  text: string;
  errors: object[];
  focussed: boolean;
  readyToSpeak: boolean;
  readyToSpeakHelp: boolean;
  awaitingTts: boolean;
  awaitingTtsHelp: boolean;
  awaitingGramadoir: boolean;
  audioData: object;
  audioDataHelp: object;
  editted: boolean;
}

const sentences = [
]

export { Sentence, sentences, /*focussedSentence*/ }
