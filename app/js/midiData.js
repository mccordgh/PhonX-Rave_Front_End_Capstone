"use strict";
// // Your variable with a ArrayBuffer instance containing your MIDI file
// var anyBuffer;

// // Creating the MIDIFile instance
// var midiFile = new MIDIFile(anyBuffer);

// // Reading headers
// midiFile.header.getFormat(); // 0, 1 or 2
// midiFile.header.getTracksCount(); // n
// // Time division
// if(midiFile.header.getTimeDivision() === MIDIFileHeader.TICKS_PER_BEAT) {
//     midiFile.header.getTicksPerBeat();
// } else {
//     midiFile.header.getSMPTEFrames();
//     midiFile.header.getTicksPerFrame();
// }

// // MIDI events retriever
// var events = midiFile.getMidiEvents();
// events[0].subtype; // type of [MIDI event](https://github.com/nfroidure/MIDIFile/blob/master/src/MIDIFile.js#L34)
// events[0].playTime; // time in ms at wich the event must be played
// events[0].param1; // first parameter
// events[0].param2; // second one

// // Lyrics retriever
// var lyrics = midiFile.getLyrics();
// if ( lyrics.length ) {
//     lyrics[0].playTime; // Time at wich the text must be displayed
//     lyrics[0].text; // The text content to be displayed
// }

// // Reading whole track events and filtering them yourself
// var events = midiFile.getTrackEvents(0);

// events.forEach(console.log.bind(console));

// // Or for a single track
// var trackEventsChunk = midiFile.tracks[0].getTrackContent();
// var events = MIDIEvents.createParser(trackEventsChunk);

// var event;
// while(event = events.next()) {
//     // Printing meta events containing text only
//     if(event.type === MIDIEvents.EVENT_META && event.text) {
//         console.log('Text meta: '+event.text);
//     }
// }



// Your variable with an ArrayBuffer instance containing your MIDI events
// var anyBuffer;

// // Parse MIDI events
// var events = [];
// var parser = new MIDIEvents.createParser(new DataView(anyBuffer), 0, false);
// var event = parser.next();

// do {
//   events.push(event);
//   event = parser.next();
// } while(event);

// // Check bufffer size before encoding
// if(anyBuffer.length >= MIDIEvents.getRequiredBufferLength(events)) {
//   console.log('ok');
// }

// // Encode MIDI events
// var destination = new Uint8Array(anyBuffer);
// MIDIEvents.writeToTrack(events, destination);





// function fromFile(){
//  plzWait(); fName(document.getElementById('file').value);
//  if(window.FileReader){
//   var reader=new FileReader();
//   var f=document.getElementById('file').files[0];
//   reader.onload=function(e){ readMidiFile(e.target.result);};
//   reader.readAsBinaryString(f);
//  }
// } 









