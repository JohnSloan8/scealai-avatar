const getWordCount = (text: string) => {
  if (!text) { return 0; }
  const str = text.replace(/[\t\n\r\.\?\!]/gm, ' ').split(' ');
  let words = [];
  str.map((s: string) => {
    const trimStr = s.trim();
    if (trimStr.length > 0) {
      words.push(trimStr);
    }
  });
  return words.length;
}

const addIds = (t: string) => {
  let x = t.split('\n')
  let newHTMLString = ""
  x.forEach( (s, i) => {
    newHTMLString += '<p id="sent_"' + i.toString() + '>' + s + '</p>' 
  })
  return newHTMLString
}

export { getWordCount, addIds }
