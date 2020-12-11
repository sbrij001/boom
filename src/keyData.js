/*
This file will contain all the key data for the project and its functionality
The key data includes a specific letter and its corresponding soound and circle color
There will be 2 buttons that will allow the user to play and record the audio
*/
var sound = new Howl({
  src: ['sounds/bubbles.mp3']
});

// Key Data
var keyData = {
  q: {
    sound: new Howl({
    src: ['sounds/bubbles.mp3']
  }),
    color: '#1abc9c'
  },
  w: {
    sound: new Howl({
    src: ['sounds/clay.mp3']
  }),
    color: '#2ecc71'
  },
  e: {
    sound: new Howl({
    src: ['sounds/confetti.mp3']
  }),
    color: '#3498db'
  },
  r: {
    sound: new Howl({
    src: ['sounds/corona.mp3']
  }),
    color: '#9b59b6'
  },
  t: {
    sound: new Howl({
    src: ['sounds/dotted-spiral.mp3']
  }),
    color: '#34495e'
  },
  y: {
    sound: new Howl({
    src: ['sounds/flash-1.mp3']
  }),
    color: '#16a085'
  },
  u: {
    sound: new Howl({
    src: ['sounds/flash-2.mp3']
  }),
    color: '#27ae60'
  },
  i: {
    sound: new Howl({
    src: ['sounds/flash-3.mp3']
  }),
    color: '#2980b9'
  },
  o: {
    sound: new Howl({
      src: ['sounds/glimmer.mp3']
  }),
    color: '#8e44ad'
  },
  p: {
    sound: new Howl({
    src: ['sounds/moon.mp3']
  }),
    color: '#2c3e50'
  },
  a: {
    sound: new Howl({
    src: ['sounds/pinwheel.mp3']
  }),
    color: '#f1c40f'
  },
  s: {
    sound: new Howl({
    src: ['sounds/piston-1.mp3']
  }),
    color: '#e67e22'
  },
  d: {
    sound: new Howl({
    src: ['sounds/piston-2.mp3']
  }),
    color: '#e74c3c'
  },
  f: {
    sound: new Howl({
    src: ['sounds/prism-1.mp3']
  }),
    color: '#95a5a6'
  },
  g: {
    sound: new Howl({
    src: ['sounds/prism-2.mp3']
  }),
    color: '#f39c12'
  },
  h: {
    sound: new Howl({
    src: ['sounds/prism-3.mp3']
  }),
    color: '#d35400'
  },
  j: {
    sound: new Howl({
    src: ['sounds/splits.mp3']
  }),
    color: '#1abc9c'
  },
  k: {
    sound: new Howl({
    src: ['sounds/squiggle.mp3']
  }),
    color: '#2ecc71'
  },
  l: {
    sound: new Howl({
    src: ['sounds/strike.mp3']
  }),
    color: '#3498db'
  },
  z: {
    sound: new Howl({
    src: ['sounds/suspension.mp3']
  }),
    color: '#9b59b6'
  },
  x: {
    sound: new Howl({
    src: ['sounds/timer.mp3']
  }),
    color: '#34495e'
  },
  c: {
    sound: new Howl({
    src: ['sounds/ufo.mp3']
  }),
    color: '#16a085'
  },
  v: {
    sound: new Howl({
    src: ['sounds/veil.mp3']
  }),
    color: '#27ae60'
  },
  b: {
    sound: new Howl({
    src: ['sounds/wipe.mp3']
  }),
    color: '#2980b9'
  },
  n: {
    sound: new Howl({
    src: ['sounds/zig-zag.mp3']
  }),
    color: '#8e44ad'
  },
  m: {
    sound: new Howl({
    src: ['sounds/moon.mp3']
  }),
    color: '#2c3e50'
  },
  1: {
    sound: new Howl({
    src: ['sounds']
  }),
    color: '#2c3e50'
  }
}
// Container that will hold media buttons
var container = document.createElement("div")
document.querySelector('h1').append(container)

// Record button
var recordButton = document.createElement('button');
recordButton.innerText = 'REC';
recordButton.className = "negative ui button"
recordButton.id = 'record-button';
document.querySelector('h1').append(recordButton)
recordButton.addEventListener('click', function(event) {
  event.target.dataset.recording = !(event.target.dataset.recording === 'true');
})

// Play button
var playButton = document.createElement('button');
playButton.className = "positive ui button active"
// Play button triangle icon
var i = document.createElement("i")
i.className = "play icon"
playButton.append(i)
// playButton.innerText = 'Play My Song';
playButton.id = 'play-button';
document.querySelector('h1').append(playButton)
// will play the song at a certain speed
playButton.addEventListener('click', function(event) {
  playSong(mySongKeys, 300)
})
container.append(recordButton, playButton)

/*
  an array that will hold all of the keys circles
  an array that will contain all of the letters being pushed down on record
*/
var circles = [], mySongKeys = [];

/*
this function will hold the logic for when a key is being pressed and if the user is trying to record a jingle
*/
function onKeyDown(event) {
  if(keyData[event.key]){
    // Creates the max points for a circle
    var maxPoint = new Point(view.size.width, view.size.height);
    var randomPoint = Point.random();
    var point = maxPoint * randomPoint;
    var newCircle = new Path.Circle(point, 500);
    newCircle.fillColor = keyData[event.key].color;
    keyData[event.key].sound.play();
    circles.push(newCircle);
  }
  var button = document.querySelector('#record-button')
  // will push all the letters of the buttons being pushed to the mySongkeys array
  if(button.dataset.recording === 'true') {
    mySongKeys.push(event.key)
    console.log(mySongKeys)
  }
}

/*
 This function will create the logic for the circles fill colors
 Each frame, change the fill color of the path slightly by
 adding 1 to its hue:
 create an array of circles and loop thru them
*/
function onFrame(event) {
  for (var i = 0; i < circles.length; i++) {
    circles[i].fillColor.hue += 1;
    circles[i].scale(.91);
  }
}

/*
  This function will take all the data and play the song with the graphics
  Due to the Paper.js library the function must be setup in this format
*/
function playSong(mySong, speedInMilliseconds) {
  var i = 0, lengthOfKeys = mySongKeys.length;
  function playOnDelay() {
      keyData[mySong[i]].sound.play();
      // creates a point on the screen
      var maxPoint = new Point(view.size.width, view.size.height);
      var randomPoint = Point.random();
      var point = maxPoint * randomPoint;
      // creates a new circle with the location of the point & size of the circle
      var newCircle = new Path.Circle(point, 500);
      newCircle.fillColor = keyData[mySong[i]].color;
        circles.push(newCircle);
      i++;
      // checks if there has been keys pressed and plays it at a certain speed
      if( i < lengthOfKeys ){
          setTimeout( playOnDelay, speedInMilliseconds);
      }
  }
  playOnDelay();
}