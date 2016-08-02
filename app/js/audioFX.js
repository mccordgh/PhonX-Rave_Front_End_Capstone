var audioCtx;
// Star out with the audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audio_Melody_Slime = $('audio')[0];
var audio_Bg_Slime = $('audio')[1];
var audio_Melody_P66 = $('audio')[2];
var audio_Bg_P66 = $('audio')[3];
var audio_Melody_Fade = $('audio')[4];
var audio_Bg_Fade = $('audio')[5];
// var source1;
// var source2;
// var main_GainNode1;
// var filter;
var ping_pong;
// var tuna;
// var sameSongCheck = 0;

// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it
var source0 = audioCtx.createMediaElementSource(audio_Melody_Slime);
var source1 = audioCtx.createMediaElementSource(audio_Bg_Slime);
var source2 = audioCtx.createMediaElementSource(audio_Melody_P66);
var source3 = audioCtx.createMediaElementSource(audio_Bg_P66);
var source4 = audioCtx.createMediaElementSource(audio_Melody_Fade);
var source5 = audioCtx.createMediaElementSource(audio_Bg_Fade);

// Create two gain node
var main_GainNode0 = audioCtx.createGain();
var main_GainNode1 = audioCtx.createGain();
var main_GainNode2 = audioCtx.createGain();
// var secondary_gainNode2 = audioCtx.createGain();
main_GainNode1.gain.value = 1;

// Create the filter.
var filter0 = audioCtx.createBiquadFilter();
var filter1 = audioCtx.createBiquadFilter();
var filter2 = audioCtx.createBiquadFilter();
// filter.type = lowpass;
// Set inital frequency
filter0.frequency.value = 100000;
filter1.frequency.value = 100000;
filter2.frequency.value = 100000;

var tuna = new Tuna(audioCtx);

var ping_pong_Slime = new tuna.PingPongDelay({
  wetLevel: 0, //0 to 1
  feedback: .5, //0 to 1
  delayTimeLeft: 125, //1 to 10000 (milliseconds)
  delayTimeRight: 250 //1 to 10000 (milliseconds)
});

var ping_pong_P66 = new tuna.PingPongDelay({
  wetLevel: 0, //0 to 1
  feedback: 0, //0 to 1
  delayTimeLeft: 214, //1 to 10000 (milliseconds)
  delayTimeRight: 428 //1 to 10000 (milliseconds)
});

var ping_pong_Fade = new tuna.PingPongDelay({
  wetLevel: 0, //0 to 1
  feedback: .5, //0 to 1
  delayTimeLeft: 224, //1 to 10000 (milliseconds)
  delayTimeRight: 448 //1 to 10000 (milliseconds)
});

// ROUT ALL THE AUDIO
// Connect the AudioBufferSourceNode to the gainNode
source0.connect(main_GainNode0);
source1.connect(main_GainNode0);
source2.connect(main_GainNode1);
source3.connect(main_GainNode1);
source4.connect(main_GainNode2);
source5.connect(main_GainNode2);
// Connect the gain to the filter
main_GainNode0.connect(filter0);
main_GainNode1.connect(filter1);
main_GainNode2.connect(filter2);
// Connect the filter to the ping pong delay
filter0.connect(ping_pong_Slime);
filter1.connect(ping_pong_P66);
filter2.connect(ping_pong_Fade);
// Connect the delay to the destination (speakers)
ping_pong_Slime.connect(audioCtx.destination);
ping_pong_P66.connect(audioCtx.destination);
ping_pong_Fade.connect(audioCtx.destination);



// var creatAudio = function (chosenSong, num1, num2) {
//   // When the user clicks back and selects the same song check
//   sameSongCheck += 1;
//   console.log("sameSongCheck", sameSongCheck);




    // <div id="song">
    //       <!-- Slime -->
    //   <audio src="./app/audio/Zionexx_Guitar_Hero_Melody.wav"></audio>
    //   <audio src="./app/audio/Zionexx_Guitar_Hero.wav"></audio>
    //       <!-- Pioneer66 -->
    //   <audio src="./app/audio/Pioneer66/P_66_Melody.wav"></audio>
    //   <audio src="./app/audio/Pioneer66/P_66_BG.wav"></audio>
    //       <!-- Fade -->
    //   <audio src="./app/audio/Fade/Fade_Melody.wav"></audio>
    //   <audio src="./app/audio/Fade/Fade_BG.wav"></audio>
    // </div>




  // var reverb_audio_Melody = $('audio')[0];
  // var reverb_audio_BG = $('audio')[1];




  // if (sameSongCheck === 1) { // only run this part the first time the function is called
  //   source1 = audioCtx.createMediaElementSource(audio_Bg);
  //   source2 = audioCtx.createMediaElementSource(audio_Melody);
  // };



  ////////////////////////////////////////////////////////////////////////
  // // Access the library of reverb
  // reverbjs.extend(audioCtx);

  // // Load the impulse response; upon load, connect it to the audio output.
  // var reverbUrl = "http://reverbjs.org/Library/ArbroathAbbeySacristy.m4a";
  // var reverbNode = audioCtx.createReverbFromUrl(reverbUrl, function() {
  //   reverbNode.connect(audioCtx.destination);
  // });
  ////////////////////////////////////////////////////////////////////////



  // Connect the audio to the destination (speakers)
  // filter.connect(audioCtx.destination);

  // Create a PingPongDelay with the tuna library



  // Route the audio from the gain to the reverb
  // gainNode1.connect(reverbNode)
  // gainNode2.connect(reverbNode)
// }
