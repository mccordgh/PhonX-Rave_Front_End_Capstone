// Game Variables

var GAME_WIDTH = 450;
var GAME_HEIGHT = 700;
var game;
var lasers_K_;
var lasers_L_;
var lasers_J_;
var X_cord;
var j_TouchDown = false;
var k_TouchDown = false;
var l_TouchDown = false;
var currentHighStreak = 0;
var currentStreak = 0;
var multiplier = 1;
var applauseId = 0;
var applauseCounter = 0;
var booCounter = 0;
var multiplierFontSize = 35;
var playerScore = 0;
var audio_applause;
var audio_boo;
var spExplosion;
var fadeOutCheck = false;
var button;
var resetLaserObject;
var cropDimensions;
var starPower = 0;
var StarBar_height;
var isStarPowerActive = false;
var starBarFull = false;
var starPowerCroppedY;
var starPowerBarIMG;
var starPowerBarMeterIMG;
var PFMimg;
var firstTimeSpaceBarFlag = true;

// Create a Phaser game instance
function createGame() {
  game = new Phaser.Game(
    GAME_WIDTH,
    GAME_HEIGHT,
    Phaser.AUTO,
    'game_container',
    { preload: preload, create: create, update: update, init: init, render: render }
  );
}

// Preload assets
function preload() {
  // Load background image
  game.load.image('background', './app/img/assets/Background.png');
  // Load text image
  game.load.bitmapFont('desyrel', './app/img/assets/desyrel.png', './app/img/assets/desyrel.xml');
  // Load other image
  var dir = 'app/img/assets/';
  game.load.image('starPowerBarIMG', dir + 'StarBarMeter2_crop.png');
  game.load.image('starPowerBarMeterIMG', dir + 'NewStarBar.png');
  game.load.image('StarPowerBorderLightning', 'app/img/assets/lightningRight.png');
  game.load.image('StarPowerBorderLightning2', 'app/img/assets/Lightnight_Left.png');
  game.load.image('laser1', dir + 'Note_Images/J_image.png');
  game.load.image('laser2', dir + 'Note_Images/K_image.png');
  game.load.image('laser3', dir + 'Note_Images/L_image.png');
  game.load.image('spaceBar', dir + 'Note_Images/space.png');
  game.load.image('StarPowerLightning', dir + 'lightning4.png');
  game.load.image('successNote', dir + 'fireball2.png');
  game.load.image('button', dir + 'start.png');
  game.load.image('ScoreBG', dir + 'ScoreBG.png');
  game.load.image('PFMimg', dir + 'PFM.png');
}
var scoreText;
var multiplierText;
var multiplierNumber;

function init() {
  // Listen to space & enter keys
  var keys = [Phaser.KeyCode.J, Phaser.KeyCode.K, Phaser.KeyCode.L, Phaser.KeyCode.SPACEBAR];
  // Create Phaser.Key objects for listening to the state
  phaserKeys = game.input.keyboard.addKeys(keys);
  // Capture these keys to stop the browser from receiving this event
  game.input.keyboard.addKeyCapture(keys);
}

// Assets are available in create
function create() {

  // Change the back drop
  if (chosenSong === "I_Want_You") {
    console.log("iwantyou");
    $('body').addClass('newBackDrop2')
  } else if (chosenSong === "Slime") {
    console.log("slime");
    $('body').addClass('newBackDrop')
  }
  // Create the variable for the height of the image
  StarBar_height = game.cache.getImage("starPowerBarIMG").height;
  cropDimensions = new Phaser.Rectangle(0, 0, 160, 160); //(starPower/2)
  // Create the background
  game.add.image(game.world.centerX, game.world.centerY, 'background').anchor.set(0.5);
  // Add the star power bar
  PFMimg = this.game.add.sprite(20,200,'PFMimg');
  PFMimg.scale.setTo(0.2,0.2);
  starPowerBarMeterIMG = this.game.add.sprite(-35,254,'starPowerBarMeterIMG');
  starPowerBarIMG = this.game.add.sprite(50,280,'starPowerBarIMG');
  starPowerBarIMG.cropEnabled = true;
  // Image for the score to sit on top of
  var ScoreBG = game.add.image(-110, -5, 'ScoreBG');
  ScoreBG.scale.setTo(1.3,1.3);
  // Create the game score and multiplier
  scoreText = game.add.bitmapText(112, 25, 'desyrel','Phaser & Pixi \nrocking!', 44);
  multiplierText = game.add.bitmapText(112, 75, 'desyrel','Phaser & Pixi \nrocking!', multiplierFontSize);
  multiplierNumber = game.add.bitmapText(275, 75, 'desyrel','Phaser & Pixi \nrocking!', multiplierFontSize);
  // Create the group using the group factory
  lasers_K_ = game.add.group();
  lasers_L_ = game.add.group();
  lasers_J_ = game.add.group();
  // To move the sprites later on, we have to enable the body
  lasers_K_.enableBody = true;
  lasers_L_.enableBody = true;
  lasers_J_.enableBody = true;
  // Set the body type to the ARCADE physics, since we don't need any advanced physics
  lasers_K_.physicsBodyType = Phaser.Physics.ARCADE;
  lasers_L_.physicsBodyType = Phaser.Physics.ARCADE;
  lasers_J_.physicsBodyType = Phaser.Physics.ARCADE;

  // This will create 100 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
  // We only have 100 lasers available, and will 'clean' and reset they're off the screen.
  lasers_K_.createMultiple(200, 'laser1');
  lasers_L_.createMultiple(200, 'laser2');
  lasers_J_.createMultiple(200, 'laser3');
  lasers_K_.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
  lasers_L_.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
  lasers_J_.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
  // Same as above, set the anchor of every sprite to 0.5, 1.0
  lasers_K_.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
  lasers_L_.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
  lasers_J_.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
  // This will set 'checkWorldBounds' to true on all sprites in the group
  lasers_K_.setAll('checkWorldBounds', true);
  lasers_L_.setAll('checkWorldBounds', true);
  lasers_J_.setAll('checkWorldBounds', true);
  button = game.add.button(game.world.centerX - 190, 200, 'button', startGame, this, 2, 1, 0);
}


