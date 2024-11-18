let song;
let dancer;
let playButton;
let fileInput;

function preload() {
    // Ensures that elements are selected after the page has loaded.
    playButton = select('#playButton');
    playButton.hide(); // Hide play button initially

    fileInput = select('#fileInput');
    fileInput.changed(handleFileSelect);
}

function setup() {
    createCanvas(600, 400);
    background(240);

    // Play button
    playButton.mousePressed(togglePlay);

    // Initially hide the play button
    playButton.hide();
}

function draw() {
    background(240);

    if (dancer) {
        dancer.display();
        dancer.move();
    }
}

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

function songLoaded() {
    playButton.show(); // Show the play button when song is loaded
}

// Toggle play/pause
function togglePlay() {
    if (song.isPlaying()) {
        song.pause();
        playButton.html("Play");
    } else {
        song.play();
        playButton.html("Pause");
    }
}

// Add a dancer when the button is clicked
function addDancer() {
    let skinColor = select('#skinColor').value();
    let shirtColor = select('#shirtColor').value();
    let pantsColor = select('#pantsColor').value();
    let size = select('#dancerSize').value();

    dancer = new Dancer(300, 200, size, skinColor, shirtColor, pantsColor);
}

// Dancer class (stick figure style)
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
        if (song && song.isLoaded()) {
            let beat = song.currentTime(); // Sync movement with the song's current time
            this.angle = Math.sin(beat * 2 * Math.PI) * 0.5; // Simple sway movement

            // Move dancer left and right
            this.x = 300 + Math.sin(beat) * 150;
            this.y = 200 + Math.cos(beat) * 50;
        }
    }

    display() {
        fill(this.skinColor);
        stroke(0);

        // Head
        ellipse(this.x, this.y - this.size / 2, this.size / 2);

        // Body
        fill(this.shirtColor);
        rect(this.x - this.size / 4, this.y, this.size / 2, this.size);

        // Legs (pants)
        fill(this.pantsColor);
        rect(this.x - this.size / 4, this.y + this.size, this.size / 4, this.size);

        // Arms (line across)
        line(this.x - this.size / 2, this.y + this.size / 4, this.x + this.size / 2, this.y + this.size / 4);
    }
}
