interface Sentence {
  id: number;
  text: string;
  errors: string;
  focussed: boolean;
  readyToSpeak: boolean;
}

const sentences = [
]

export { Sentence, sentences, /*focussedSentence*/ }
