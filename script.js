let song;
let dancers = [];
let playButton;
let addDancerButton;
let skinColorPicker, shirtColorPicker, pantsColorPicker, dancerSizePicker;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('danceCanvas');  // Attach the canvas to the div
    background(240);

    playButton = createButton("Play");
    playButton.position(10, 60);
    playButton.mousePressed(togglePlay);
    playButton.hide();  // Initially hidden, will show after song is loaded

    addDancerButton = select('#addDancer');
    addDancerButton.mousePressed(addDancer);

    skinColorPicker = select('#skinColor');
    shirtColorPicker = select('#shirtColor');
    pantsColorPicker = select('#pantsColor');
    dancerSizePicker = select('#dancerSize');

    let input = document.getElementById('fileInput');
    input.addEventListener('change', handleFileSelect, false);
}

function draw() {
    background(240);

    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

// File select handler (for loading music)
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            song = loadSound(e.target.result, songLoaded);
        };
        reader.readAsDataURL(file);
    }
}

// Show play button after sound is loaded
function songLoaded() {
    playButton.show();  // Show the play button when song is loaded
}

// Play/Pause button toggle
function togglePlay() {
    if (song.isPlaying()) {
        song.pause();
        playButton.html("Play");
    } else {
        song.play();
        playButton.html("Pause");
    }
}

// Add a dancer to the canvas
function addDancer() {
    let skinColor = skinColorPicker.value();
    let shirtColor = shirtColorPicker.value();
    let pantsColor = pantsColorPicker.value();
    let size = dancerSizePicker.value();

    dancers.push(new Dancer(200, 200, size, skinColor, shirtColor, pantsColor));
}

// Dancer class (with customizable appearance)
class Dancer {
    constructor(x, y, size, skinColor, shirtColor, pantsColor) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.skinColor = skinColor;
        this.shirtColor = shirtColor;
        this.pantsColor = pantsColor;
        this.angle = 0;
    }

    move() {
        if (!song) return; // Ensure song is loaded before calling currentTime
        let beat = song.currentTime();  // Sync movement with the song's current time
        this.angle = Math.sin(beat * 2 * Math.PI) * 0.5;  // Simple sway movement

        // Make the dancer move left and right
        this.x = 300 + Math.sin(beat) * 150;
        this.y = 200 + Math.cos(beat) * 50;
    }

    display() {
        fill(this.skinColor);
        stroke(0);

        // Head
        ellipse(this.x, this.y - this.size / 2, this.size / 2);

        // Body
        fill(this.shirtColor);  // Shirt color
        rect(this.x - this.size / 4, this.y, this.size / 2, this.size);

        // Legs (pants)
        fill(this.pantsColor);  // Pants color
        rect(this.x - this.size / 4, this.y + this.size, this.size / 4, this.size);

        // Arms
        line(this.x - this.size / 2, this.y + this.size / 4, this.x + this.size / 2, this.y + this.size / 4);
    }
}
