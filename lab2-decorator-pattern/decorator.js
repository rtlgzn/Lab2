// Base Label class: Represents text only, without borders
class Label {
    constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
    }

    draw() {
        fill(0);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y);
    }

    getBaseLabel() {
        return this;
    }
}

// Base Decorator: Wraps around a Label and adds a visual effect
class LabelDecorator {
    constructor(label) {
        this.label = label;
    }

    draw() {
        this.label.draw(); // Always draw base label first (text only)
    }

    getBaseLabel() {
        return this.label.getBaseLabel();
    }
}

// Thin Border Decorator
class ThinBorder extends LabelDecorator {
    draw() {
        this.label.draw();
        let { x, y } = this.label.getBaseLabel();
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(x - 35, y - 15, 70, 30);
    }
}

// Thick Border Decorator
class ThickBorder extends LabelDecorator {
    draw() {
        this.label.draw();
        let { x, y } = this.label.getBaseLabel();
        noFill();
        stroke(255, 0, 0);
        strokeWeight(5);
        rect(x - 40, y - 20, 80, 40);
        strokeWeight(1);
    }
}

// Dots Border Decorator
class DotsBorder extends LabelDecorator {
    draw() {
        this.label.draw();
        let { x, y } = this.label.getBaseLabel();
        fill(0, 255, 0);
        for (let i = -45; i <= 45; i += 10) {
            ellipse(x + i, y - 25, 5, 5);
            ellipse(x + i, y + 25, 5, 5);
        }
    }
}

// Custom Glow Effect Decorator (Expands around all existing borders)
class GlowDecorator extends LabelDecorator {
    draw() {
        this.label.draw();
        let { x, y } = this.label.getBaseLabel();
        stroke(0, 0, 255, 150);
        strokeWeight(8);
        for (let i = 10; i <= 20; i += 5) {
            rect(x - 50 - i, y - 30 - i, 100 + i * 2, 60 + i * 2);
        }
        strokeWeight(1);
    }
}

// Store labels and track selected label
let labels = [];
let selectedLabelIndex = 0;

function setup() {
    createCanvas(600, 400);

    // Create five labels and add them to the array
    labels.push(new Label("Label 1", 150, 150));
    labels.push(new Label("Label 2", 300, 150));
    labels.push(new Label("Label 3", 450, 150));
    labels.push(new Label("Label 4", 200, 250));
    labels.push(new Label("Label 5", 350, 250));

    selectedLabelIndex = 0;
}

function draw() {
    background(240); // Light gray background

    // Draw all labels (ensuring text remains unchanged)
    labels.forEach(label => {
        label.getBaseLabel().draw(); // Draw the text first
        label.draw(); // Then draw its decorators (borders)
    });
}

// Function to apply a decorator based on the selected type
function addDecorator(type) {
    if (selectedLabelIndex === null) return;

    let selectedLabel = labels[selectedLabelIndex];

    switch (type) {
        case 'thin':
            labels[selectedLabelIndex] = new ThinBorder(selectedLabel);
            console.log("Thin border added");
            break;
        case 'thick':
            labels[selectedLabelIndex] = new ThickBorder(selectedLabel);
            console.log("Thick border added");
            break;
        case 'dots':
            labels[selectedLabelIndex] = new DotsBorder(selectedLabel);
            console.log("Dots border added");
            break;
        case 'glow':
            labels[selectedLabelIndex] = new GlowDecorator(selectedLabel);
            console.log("Custom Glow border added");
            break;
    }
}

// Function to remove the last applied decorator
function removeLastDecorator() {
    if (selectedLabelIndex === null) return;

    let selectedLabel = labels[selectedLabelIndex];

    if (selectedLabel instanceof Label) return; // Can't remove base Label

    labels[selectedLabelIndex] = selectedLabel.label; // Revert to previous decorator
    console.log("Removed last border");
}

// Function to handle label selection from radio buttons
function selectLabel(index) {
    selectedLabelIndex = index;
    console.log("Selected Label:", labels[selectedLabelIndex].getBaseLabel().text);
}
