interface Sentence {
  id: number;
  text: string;
  errors: string;
  focussed: boolean;
  readyToSpeak: boolean;
}

const sentences = [
  {
    id: 0,
    text: "Cad é mar atá tú",
    errors: null,
    focussed: true,
    readyToSpeak: false
  },
  {
    id: 1,
    text: "Tá mé go maith",
    errors: null,
    focussed: false,
    readyToSpeak: true
  },
  {
    id: 2,
    text: "agus tú féin",
    errors: null,
    focussed: false,
    readyToSpeak: false
  }
]

//var focussedSentence = 0

export { Sentence, sentences, /*focussedSentence*/ }
