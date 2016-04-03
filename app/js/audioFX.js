// Star out with the audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Access your audio files
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

// I think this is accessing the library of reverb ??????????????????????
reverbjs.extend(audioCtx);

// Load the impulse response; upon load, connect it to the audio output.
var reverbUrl = "http://reverbjs.org/Library/ArbroathAbbeySacristy.m4a";
var reverbNode = audioCtx.createReverbFromUrl(reverbUrl, function() {
  reverbNode.connect(audioCtx.destination);
});

// Route the audio from the gain to the reverb
gainNode1.connect(reverbNode)
gainNode2.connect(reverbNode)
// reverbNode.connect(audioCtx.destination);

/////////////////////////////////////////////////////////////////

var lineOut = new WebAudiox.LineOut(audioCtx)
// initialize the stage and get the context
var stage = new pb.Stage();
var ctx = stage.getContext();

// initialize the board and pedals
var board = new pb.Board(ctx);
var od = new pb.stomp.Overdrive(ctx);
var reverb = new pb.stomp.Reverb(ctx);
var vol = new pb.stomp.Volume(ctx);

// add pedals to board
board.addPedals([od, reverb]);
board.addPedalsAt(1, vol);

// tweak pedal settings
od.setDrive(0.7);
od.setLevel(0.7);
reverb.setLevel(0.3);
vol.setLevel(0.2);

// set the board on stage and start playing!
stage.setBoard(board);