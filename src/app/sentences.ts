interface Sentence {
  id: number;
  text: string;
  errors: object[];
  focussed: boolean;
  readyToSpeak: boolean;
  awaitingTts: boolean;
  awaitingGramadoir: boolean;
}

const sentences = [
]

export { Sentence, sentences, /*focussedSentence*/ }
