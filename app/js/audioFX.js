var audioCtx;
var audio_Melody;
var audio_Bg;
var source1;
var source2;
var main_GainNode1;
var filter;
var ping_pong;
var tuna;

var creatAudio = function (chosenSong, num1, num2) {
  // Star out with the audio context
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audio_Melody = $('audio')[num1];
  audio_Bg = $('audio')[num2];
  // var reverb_audio_Melody = $('audio')[0];
  // var reverb_audio_BG = $('audio')[1];

  // Create a MediaElementAudioSourceNode
  // Feed the HTMLMediaElement into it
  source1 = audioCtx.createMediaElementSource(audio_Bg);
  source2 = audioCtx.createMediaElementSource(audio_Melody);

  // Create two gain node
  main_GainNode1 = audioCtx.createGain();
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
  filter = audioCtx.createBiquadFilter();
  // filter.type = lowpass;
  // Set inital frequency
  filter.frequency.value = 100000;

  // Connect the audio to the destination (speakers)
  // filter.connect(audioCtx.destination);

  // Create a PingPongDelay with the tuna library
  tuna = new Tuna(audioCtx);

  if (chosenSong === "Pioneer66") {
    ping_pong = new tuna.PingPongDelay({
      wetLevel: 0, //0 to 1
      feedback: 0, //0 to 1
      delayTimeLeft: 214, //1 to 10000 (milliseconds)
      delayTimeRight: 428 //1 to 10000 (milliseconds)
    });
  } else if (chosenSong === "Slime") {
    ping_pong = new tuna.PingPongDelay({
      wetLevel: 0, //0 to 1
      feedback: .5, //0 to 1
      delayTimeLeft: 125, //1 to 10000 (milliseconds)
      delayTimeRight: 250 //1 to 10000 (milliseconds)
    });
  } else if (chosenSong === "Fade") {
    ping_pong = new tuna.PingPongDelay({
      wetLevel: 0, //0 to 1
      feedback: .5, //0 to 1
      delayTimeLeft: 224, //1 to 10000 (milliseconds)
      delayTimeRight: 448 //1 to 10000 (milliseconds)
    });
  }


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
}
