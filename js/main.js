const synth = window.speechSynthesis;
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');



///voice array
let voices = [];


const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    //loop voices
    voices.forEach(voice => {
        const option = document.createElement('option');
        //filling voice
        option.textContent = voice.name + '('+ voice.lang +')';

        //set option attribute
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined)
{
synth.onvoiceschanged = getVoices;
}


//speech
const speak = () => {
    if(synth.speaking)
    {
console.error('ALREADY SPEAKING....');
return;
    }
    if(textInput.value !== ''){
//get speek text
const speakText = new SpeechSynthesisUtterance(textInput.value);
//speak end
speakText.onend = e => {
    console.log('DONE SPEAKING...');
}
speakText.onerror = e => {
    console.error('some thing went wrong..');
}

//selected voice
const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

//loop throu voice
voices.forEach(voice => {
    if(voice.name === selectedVoice){
        speakText.voice = voice;

    }
});
speakText.rate = rate.value;
speakText.pitch = pitch.value;
synth.speak(speakText);
    }
};
//event listen
textForm.addEventListener('submit', e=> {
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener('change', e=> (rateValue.textContent = rate.value))
pitch.addEventListener('change', e=> (pitchValue.textContent = pitch.value))

//voice select change
voiceSelect.addEventListener('change', e=> speak());
//git initial commit