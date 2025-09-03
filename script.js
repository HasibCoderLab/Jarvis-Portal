// script.js (append / replace respond & startListening handlers)
const micBtn = document.getElementById('micBtn'); // add id="micBtn" to your Speak button
const micWrap = document.querySelector('.mic'); // optional wrapper if you add it

function showTyping(){
  const r = document.getElementById('response');
  r.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
}

function respond(){
  const userInput = document.getElementById('userInput').value.toLowerCase().trim();
  const responseDiv = document.getElementById('response');
  if(!userInput){ responseDiv.innerText = "Try typing or speaking a command."; return; }

  showTyping();
  // emulate processing delay for UX (250-700ms)
  setTimeout(()=> {
    let response = '';
    if (userInput.includes('hello')) {
        response = 'Hello! How can I assist you today?';
    } else if (userInput.includes('how are you')) {
        response = 'I am just a program, but I am functioning properly!';
    } else if (userInput.includes('time')) {
        // Dhaka timezone display (if user in BD)
        const currentTime = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Dhaka'});
        response = `The current time is ${currentTime}.`;
    } else if (userInput.includes('open youtube')) {
        const searchQuery = userInput.split('open youtube ')[1] || '';
        response = 'Opening YouTube...';
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
    } else if (userInput.includes('open google')) {
        const searchQuery = userInput.split('open google ')[1] || '';
        response = 'Opening Google...';
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    } else if (userInput.includes('open facebook')) {
        response = 'Opening Facebook...';
        window.open('https://www.facebook.com', '_blank');
    } else {
        response = 'Sorry, I do not understand that command.';
    }
    responseDiv.innerText = response;
  }, 350);
}

function startListening(){
  micWrap?.classList.add('pulse');
  recognition.start();
  recognition.onend = ()=> micWrap?.classList.remove('pulse');
}
