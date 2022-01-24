const setIds = () => {
  let quillCont = document.getElementsByClassName("ql-editor");
  let audioDivCont = document.getElementById("audioButtonsDiv");
  let audioButtonsBar = document.getElementById("audioButtonsBar");

  Array.from(quillCont[0].children).forEach((c, i) => {


    c.id = "sent_" + i
    let distanceFromTop = c.getBoundingClientRect().top - 20;
    let audioDiv = document.getElementById('audioDiv_' + i)
    if ( audioDiv === null && c.innerHTML !== "<br>") {
      console.log('c:', c)
      console.log('c.innerHTML:', )
      let newAudioDiv = audioButtonsBar.cloneNode(true) as HTMLElement;
      console.log('newAudioDiv:', newAudioDiv)
      newAudioDiv.id = 'audioDiv_' + i; 
      newAudioDiv.style.top = distanceFromTop.toString() + 'px';
      newAudioDiv.style.visibility = 'visible'
      audioDivCont.appendChild(newAudioDiv);
    } 
    //audioDiv.style.top = distanceFromTop.toString() + 'px';

  })
}


export { setIds }
