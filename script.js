let song;
let dancers = [];
let playButton;

function setup() {
    createCanvas(600, 400);
    background(240);

    // Create play button
    playButton = createButton("Play");
    playButton.position(10, 10);
    playButton.mousePressed(togglePlay);

    // Load file input
    let input = createFileInput(handleFileSelect);
    input.position(10, 40);
}

function draw() {
    background(240);

    // Draw all dancers
    dancers.forEach(dancer => {
        dancer.display();
        dancer.move();
    });
}

// Handle file selection for the audio
function handleFileSelect(file) {
    if (file.type === 'audio') {
        song = loadSound(file.data, songLoaded);
    }
}

// Show the play button when the song is loaded
function songLoaded() {
    playButton.show();
}

// Play/Pause the song
function togglePlay() {
    if (song.isPlaying()) {
        song.pause();
        playButton.html("Play");
    } else {
        song.play();
        playButton.html("Pause");
    }
}

// Dancer class to define a humanoid figure
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

    // Move the dancer in sync with the music
    move() {
        let beat = song.currentTime();
        this.angle += 0.05 + (beat % 2) * 0.01;
        this.x = 300 + Math.sin(this.angle) * 100;
        this.y = 200 + Math.cos(this.angle) * 100;
    }

    // Display the dancer
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

// Add dancers when 'Add Dancer' button is pressed
function mousePressed() {
    // Example of adding a dancer with default appearance
    dancers.push(new Dancer(200, 200, "#F5CBA7", "#2980B9", "#1C2833", 50));
}
