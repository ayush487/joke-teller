const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK

// Passing Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: '750898f757db490eae9b10d5331fcde8',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`
        }else {
            joke = data.joke;
        }
        tellMe(joke)
        button.disabled = true;
    } catch (error) {
        // Catch Errors here
        console.log('whoops', error)
        tellMe('Something went wrong!, check console for a detail info')
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', () => button.disabled = false)
