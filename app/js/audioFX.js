// Star out with the audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Access your audio files
var audio_Bg = $('audio')[1];
var audio_Melody = $('audio')[0];
var reverb_audio_Melody = $('audio')[0];
var reverb_audio_BG = $('audio')[1];

// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it
var source1 = audioCtx.createMediaElementSource(reverb_audio_Melody);
var source2 = audioCtx.createMediaElementSource(reverb_audio_BG);

// Create a gain node
var gainNode1 = audioCtx.createGain();
var gainNode2 = audioCtx.createGain();
gainNode1.gain.value = 1;
gainNode2.gain.value = 1;

// Connect the AudioBufferSourceNode to the gainNode
source1.connect(gainNode1);
source2.connect(gainNode2);
// sour1.detune.value = 100; // value in cents

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
filter.frequency.value = 100000;
// source.connect(filter);
gainNode1.connect(filter)
gainNode2.connect(filter)
filter.connect(audioCtx.destination);


// Route the audio from the gain to the reverb
// gainNode1.connect(reverbNode)
// gainNode2.connect(reverbNode)

