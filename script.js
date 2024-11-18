let song;
let dancers = [];
let playButton;
let skinColor = "#F5CBA7";
let shirtColor = "#2980B9";
let pantsColor = "#1C2833";
let dancerSize = 50;

function setup() {
    createCanvas(600, 400);
    background(240);

    // Create play button and hide it initially
    playButton = select('#playButton');
    playButton.mousePressed(togglePlay);
    
    // File input to upload song
    let input = select('#fileInput');
    input.changed(handleFileSelect);

    // Add Dancer button
    select('#addDancer').mousePressed(addDancer);
}

function draw() {
    background(240);

    // Draw all dancers
    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        song = loadSound(URL.createObjectURL(file), songLoaded);
    }
}

function songLoaded() {
    playButton.show();
}

function togglePlay() {
    if (song.isPlaying()) {
        song.pause();
        playButton.html("Play");
    } else {
        song.play();
        playButton.html("Pause");
    }
}

function addDancer() {
    let dancer = new Dancer(300, 200, skinColor, shirtColor, pantsColor, dancerSize);
    dancers.push(dancer);
}

// Dancer class to draw a humanoid figure
class Dancer {
    constructor(x, y, skinColor, shirtColor, pantsColor, size) {
        this.x = x;
        this.y = y;
        this.skinColor = skinColor;
        this.shirtColor = shirtColor;
        this.pantsColor = pantsColor;
        this.size = size;
        this.angle = 0;
    }

    move() {
        let beat = song.currentTime();
        this.angle += 0.05 + (beat % 2) * 0.01;
        this.x = 300 + Math.sin(this.angle) * 100;
        this.y = 200 + Math.cos(this.angle) * 100;
    }

    display() {
        push();  // Start a new drawing state

        // Draw the body (torso)
        fill(this.shirtColor);
        rect(this.x - this.size / 4, this.y, this.size / 2, this.size);

        // Draw the legs
        fill(this.pantsColor);
        rect(this.x - this.size / 4, this.y + this.size, this.size / 4, this.size / 2);
        rect(this.x, this.y + this.size, this.size / 4, this.size / 2);

        // Draw the arms
        line(this.x - this.size / 2, this.y + this.size / 2, this.x - this.size, this.y + this.size);  // Left arm
        line(this.x + this.size / 2, this.y + this.size / 2, this.x + this.size, this.y + this.size);  // Right arm

        // Draw the head
        fill(this.skinColor);
        ellipse(this.x, this.y - this.size / 2, this.size / 2);

        pop();  // End the drawing state
    }
}
