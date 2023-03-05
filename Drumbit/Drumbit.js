
 
// below commented code not work properly  so we add set timeout function
// function trasition(e){
//     if (e.propertyName !== 'transform') return;
//     e.classList.remove('playing');
// }
function playSound(e) {
    const audio = document.querySelector(`audio[data-code="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-code="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    
    audio.currentTime = 0;  //starting from zero
    audio.play();

    setTimeout(()=>key.classList.remove('playing'),100);    
  }
document.addEventListener('keydown', playSound);

// document.addEventListener('transitionend',trasition);
