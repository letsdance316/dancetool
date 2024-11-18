let song;
let dancers = [];
let playButton;
let addDancerButton;
let skinColorPicker, shirtColorPicker, pantsColorPicker, dancerSizePicker;

function setup() {
    createCanvas(600, 400);
    background(240);

    // Play button setup
    playButton = createButton("Play");
    playButton.position(10, 60);  // Adjust position
    playButton.mousePressed(togglePlay);
    playButton.hide();  // Initially hidden, will show after song is loaded

    // Add Dancer button
    addDancerButton = select('#addDancer');
    addDancerButton.mousePressed(addDancer);

    // Appearance controls
    skinColorPicker = select('#skinColor');
    shirtColorPicker = select('#shirtColor');
    pantsColorPicker = select('#pantsColor');
    dancerSizePicker = select('#dancerSize');

    // File input handler
    let input = document.getElementById('fileInput');
    input.addEventListener('change', handleFileSelect, false);
}

function draw() {
    background(240);

    // Draw and animate dancers
    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

// Handle file select for song loading
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

// Show play button after song is loaded
function songLoaded() {
    playButton.show();  // Show the play button when song is ready
}

// Play/Pause functionality for the song
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

// Dancer class with customizable appearance and movement
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
        if (song && song.isLoaded()) {  // Check if song is loaded
            let beat = song.currentTime(); 
            this.angle = Math.sin(beat * 2 * Math.PI) * 0.5; // Simple sway movement

            // Make the dancer move left and right based on the song beat
            this.x = 300 + Math.sin(beat) * 150;
            this.y = 200 + Math.cos(beat) * 50;
        }
    }

    display() {
        fill(this.skinColor);  // Skin color
        stroke(0);

        // Draw the head
        ellipse(this.x, this.y - this.size / 2, this.size / 2);

        // Draw the body (shirt)
        fill(this.shirtColor);
        rect(this.x - this.size / 4, this.y, this.size / 2, this.size);

        // Draw the legs (pants)
        fill(this.pantsColor);
        rect(this.x - this.size / 4, this.y + this.size, this.size / 4, this.size);

        // Draw the arms (horizontal line)
        line(this.x - this.size / 2, this.y + this.size / 4, this.x + this.size / 2, this.y + this.size / 4);
    }
}
