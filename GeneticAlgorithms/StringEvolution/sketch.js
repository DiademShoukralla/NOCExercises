let population = 100; // Population of 100 entities
let mutation = 0.01; // 1% mutation rate
let totalGenerations = 0; // How many generations have occured.
let avgFitness = 0; // Average "fitness" score of the population.
let phrase = ""; // Goal Phrase

let canvas;

function setup() {
    canvas = createCanvas(800, 500);

    input = createInput();
    input.attribute("placeholder", "Goal Phrase");
  
    button = createButton('Start Simulation');
  }
  
function draw() {
    background(220);
    text(population, 0, 10);
    text(mutation, 0, 20);
    text(totalGenerations,0, 30);
    text(avgFitness, 0, 40);
    text(phrase, 0, 50);
}