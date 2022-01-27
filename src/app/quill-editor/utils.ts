import axios from 'axios'
import mouth from '../avatar/three/mouth'

const setIds = (q) => {
  let quillCont = document.getElementsByClassName("ql-editor");
  let audioDivCont = document.getElementById("audioButtonsDiv");
  let audioButtonsBar = document.getElementById("audioButtonsBar");

  let max_sent = 0
  Array.from(quillCont[0].children).forEach((c, i) => {
    c.id = "sent_" + i
    let distanceFromTop = c.getBoundingClientRect().top - 10;
    let audioDiv = document.getElementById('audioDiv_' + i)
    if ( i < quillCont[0].children.length - 1 && audioDiv === null ) {
      getSpeechSynthesis(c.innerHTML, i)
      let newAudioDiv = audioButtonsBar.cloneNode(true) as HTMLElement;
      newAudioDiv.id = 'audioDiv_' + i; 
      newAudioDiv.children[0].id = "mic_" + i
      newAudioDiv.children[1].id = "speaker_" + i
      newAudioDiv.children[2].id = "synth_" + i
      newAudioDiv.children[3].id += i
      newAudioDiv.style.top = distanceFromTop.toString() + 'px';
      newAudioDiv.style.visibility = 'visible'
      audioDivCont.appendChild(newAudioDiv);
    }
    //audioDiv.style.top = distanceFromTop.toString() + 'px';
    (i > max_sent) ? max_sent = i : null;
  })

  // for deleting audio bars when line is deleted
  let noAudioButtonBars = audioDivCont.children.length -1;
  for (let j=max_sent+1; j<noAudioButtonBars; j++) {
    document.getElementById("audioDiv_" + j).remove();
  }

}

let speaking = false
const getSpeechSynthesis = (text, sentId) => {
  console.log('text:', text)
  axios
    .post(
        "https://warm-reef-17230.herokuapp.com/api/v1/getIrishSynthesis",
        //"https://localhost/api/v1/getIrishSynthesis",
		    { "text": text }
      )
      .then((json) => {
				console.log('returned from json', json.data)
        let a = <HTMLVideoElement> document.getElementById('audio_player_' + sentId)
        console.log('a:', a)
        a.setAttribute("src", "data:audio/wav;base64," + json.data.audioContent)
    
        let m = document.getElementById('synth_' + sentId)
        m.addEventListener('click', () => {
          a.play()
          speaking = true;
          mouth(false);
          let endTime = json.data.timing[json.data.timing.length-1].end
          setTimeout(function(){
            speaking = false;
            mouth();
          }, parseFloat(endTime)*1000);
        })
        m.style.visibility = "visible"

				//dataURL = 'https://warm-reef-17230.herokuapp.com/api/v1/getCoordByURL/' + json.data.name
				//APIInfoCont.style.visibility = "visible";
				//clearAll();
				//inputImageURL.style.visibility = "hidden"
				//wordSelectorCont.style.visibility = "hidden"
	})
}

export { setIds, speaking }
