// ==========================
// Jarvis AI Script
// ==========================

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('🎙️ Voice recognition started...');
};

recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript.toLowerCase();
    document.getElementById('userInput').value = transcript;
    respond();
};

// Mic wrapper for pulsing effect (optional)
const micWrap = document.querySelector('.mic'); // add class="mic" to Speak button or wrapper

// Typing animation display
function showTyping() {
    const r = document.getElementById('response');
    r.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
}

// Main response function
function respond() {
    const userInput = document.getElementById('userInput').value.toLowerCase().trim();
    const responseDiv = document.getElementById('response');

    if (!userInput) {
        responseDiv.innerText = "Try typing or speaking a command.";
        return;
    }

    showTyping();

    // simulate processing delay
    setTimeout(() => {
        let response = '';

        if (userInput.includes('hello')) {
            response = 'Hello! How can I assist you today?';
        } else if (userInput.includes('how are you')) {
            response = 'I am just a program, but I am functioning properly!';
        }
        else if (userInput.includes('who are you')) {
            response = 'I am just a Jarvis, Created By Hasib Hasan Sir';
        }
        else if (userInput.includes('what is your name')) {
            response = 'I am Jarvis, a virtual assistant program!';
        }

        else if (userInput.includes('time')) {
            const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' });
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

// Start voice recognition
function startListening() {
    micWrap?.classList.add('pulse');  // add pulsing effect
    recognition.start();
    recognition.onend = () => micWrap?.classList.remove('pulse');
}

// ==========================
// Keyboard Shortcuts
// ==========================
document.addEventListener("keydown", function (e) {
    const input = document.getElementById('userInput');

    // Enter = Ask Jarvis
    if (e.key === "Enter") {
        e.preventDefault();
        respond();
    }

    // Ctrl + / = focus input
    if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        input.focus();
    }

    // Ctrl + M = start microphone
    if (e.ctrlKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        startListening();
    }

    // Esc = clear input
    if (e.key === "Escape") {
        input.value = "";
    }
});
