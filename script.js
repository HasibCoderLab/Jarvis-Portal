// script.js

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    console.log('Voice recognition started. Try speaking into the microphone.');
};

recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript.toLowerCase();
    document.getElementById('userInput').value = transcript;
    respond();
};

function startListening() {
    recognition.start();
}

function respond() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    const responseDiv = document.getElementById('response');

    let response = '';

    if (userInput.includes('hello')) {
        response = 'Hello! How can I assist you today?';
    } else if (userInput.includes('how are you')) {
        response = 'I am just a program, but I am functioning properly!';
    } else if (userInput.includes('time')) {
        const currentTime = new Date().toLocaleTimeString();
        response = `The current time is ${currentTime}.`;
    } else if (userInput.includes('open youtube')) {
        const searchQuery = userInput.split('open youtube ')[1];
        response = 'Opening YouTube...';
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
    } else if (userInput.includes('open google')) {
        const searchQuery = userInput.split('open google ')[1];
        response = 'Opening Google...';
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    } else if (userInput.includes('open facebook')) {
        response = 'Opening Facebook...';
        window.open('https://www.facebook.com', '_blank');
    } else {
        response = 'Sorry, I do not understand that command.';
    }

    responseDiv.innerText = response;
}
