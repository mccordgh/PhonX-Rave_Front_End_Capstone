// Star out with the audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Access your audio files
var audio_Bg = $('audio')[1];
var audio_Melody = $('audio')[0];
// var reverb_audio_Melody = $('audio')[0];
// var reverb_audio_BG = $('audio')[1];

// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it
var source1 = audioCtx.createMediaElementSource(audio_Bg);
var source2 = audioCtx.createMediaElementSource(audio_Melody);

// Create two gain node
var main_GainNode1 = audioCtx.createGain();
// var secondary_gainNode2 = audioCtx.createGain();
main_GainNode1.gain.value = 1;



////////////////////////////////////////////////////////////////////////
// // Access the library of reverb
// reverbjs.extend(audioCtx);

// // Load the impulse response; upon load, connect it to the audio output.
// var reverbUrl = "http://reverbjs.org/Library/ArbroathAbbeySacristy.m4a";
// var reverbNode = audioCtx.createReverbFromUrl(reverbUrl, function() {
//   reverbNode.connect(audioCtx.destination);
// });
////////////////////////////////////////////////////////////////////////

// Create the filter.
var filter = audioCtx.createBiquadFilter();
// filter.type = lowpass;
// Set inital frequency
filter.frequency.value = 100000;


// Connect the audio to the destination (speakers)
// filter.connect(audioCtx.destination);

// Create a PingPongDelay with the tuna library
var tuna = new Tuna(audioCtx);
var ping_pong = new tuna.PingPongDelay({
    wetLevel: 0, //0 to 1
    feedback: .5, //0 to 1
    delayTimeLeft: 125, //1 to 10000 (milliseconds)
    delayTimeRight: 250 //1 to 10000 (milliseconds)
});






// ROUT ALL THE AUDIO
// Connect the AudioBufferSourceNode to the gainNode
source1.connect(main_GainNode1);
source2.connect(main_GainNode1);
// Connect the gain to the filter
main_GainNode1.connect(filter)
// Connect the filter to the ping pong delay
filter.connect(ping_pong);
// Connect the delay to the destination (speakers)
ping_pong.connect(audioCtx.destination);


// Route the audio from the gain to the reverb
// gainNode1.connect(reverbNode)
// gainNode2.connect(reverbNode)

