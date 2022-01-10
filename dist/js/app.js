// Init speech synthesis
const synth = window.speechSynthesis

// DOM variables
const speechForm = document.getElementById('speech-form')
const textInput = document.getElementById('text-input')
const rateValue = document.querySelector('#rate-value')
const rate = document.querySelector('#rate')
const pitchValue = document.getElementById('pitch-value')
const pitch = document.getElementById('pitch')
const voiceSelect = document.querySelector('#voice-select')
const body = document.querySelector('body')
const speakBtn = document.getElementById('speak')

// Array to store voices got form speech api
let voices = []

// getVoices function to getVoices and paste to UI =) 
const getVoices = () => {
    voices = synth.getVoices()
    
    // create option tag when looping trough voices
    voices.forEach(voice => {
        // create option tag
        const option = document.createElement('option')

        // append class name
        option.className = 'speech-lang'

        // insert text content of option tag
        option.textContent = `${voice.name} (${voice.lang})`

        // add attribute
        option.setAttribute('data-name', voice.name)
        option.setAttribute('data-lang', voice.lang)

        voiceSelect.appendChild(option)        
    })
    console.log(voices)

    //voices.forEach(voice => {
    //    console.log(voice)
    //})
}

//getVoices()


if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices
}

const speak = () => {
    // check to see if speaking
    if(synth.speaking){
        console.error('Already speaking...')
        return
    }

    // check to see if there's an input value
    if(textInput.value !== '') {
        const speechText = new SpeechSynthesisUtterance(textInput.value)

        body.style.background = `#141414 url(img/wave.gif)`
        body.style.backgroundRepeat = `repeat-x`
        body.style.backgroundSize = `100% 100%`

        speechText.onerror = (err) => {
            console.error(err)
        }

        speechText.onend = (e) => {
            console.log('Done Speaking')
            body.style.background = `#141414`
        }

        const a = voiceSelect.value
        let selectedOption 
        const options = Array.from(document.getElementsByClassName('speech-lang'))
        
        options.forEach((option) => {
            if(option.textContent === a) {
                selectedOption = option
            }
        })

        voices.forEach(voice => {

            if(voice.name === selectedOption.getAttribute('data-name')){
                speechText.voice = voice
            }
        })

        speechText.rate = rate.value
        speechText.pitch = pitch.value

        synth.speak(speechText)


    }

}

speechForm.addEventListener('submit', (e) => {
    speak()

    //setTimeout(() => synth.cancel(), 2000)

    textInput.blur()

   e.preventDefault() 
})

// event listener to be trigerred when a select value changes
voiceSelect.addEventListener('change', () => {
    speak()
    //setTimeout(() => synth.cancel(), 2000)
})

// paint rate and pitch value to UI
rate.addEventListener('change', () => rateValue.textContent = rate.value)

pitch.addEventListener('change', () => pitchValue.textContent = pitch.value)
