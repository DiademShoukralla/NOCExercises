let population = 100; // Population of 100 entities
let mutation = 0.01; // 1% mutation rate
let totalGenerations = 1; // How many generations have occured.
let avgFitness = 0; // Average "fitness" score of the population.
let phrase = ""; // Goal Phrase

let phraseID = "phraseInput";
let submitId = "submitButton";

let currentWords = new Array();

let validCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.'!?";

function setup() {
    createCanvas(800, 500);

    let phraseInput = createInput();
    phraseInput.attribute("placeholder", "Goal Phrase");
    phraseInput.id(phraseID);
  
    let startButton = createButton('Start Simulation');
    startButton.mouseClicked(startSimulation);
    startButton.id(submitId);

}
  
function draw() {
    background(220);
    drawAttributes();
    drawCurrentWords();
}

function getPercent(decimal){
  return decimal * 100 + "%";
}

function drawAttributes() {
  push();
  let order = 1;
  text("Phrase: " + phrase, 0, order*10);
  order ++;
  text("Generation: " + totalGenerations,0, order*10);
  order ++;
  text("Population: " + population, 0, order*10);
  order ++;
  text("Mutation: " + getPercent(mutation), 0, order*10);
  order ++;
  text("Average Fitness: " + getPercent(avgFitness), 0, order*10);
  pop();
}

function drawCurrentWords() {
  push();
  let xCounter = 0;
  let yCounter = 0;
  for(var i = 0; i< currentWords.length; i++) {
    y = yCounter*10;
    if(y >= height) {
      yCounter = 1;
      y = yCounter*10;
      xCounter ++;
    }
    yCounter++;
    text(currentWords[i], 200 + (xCounter*100), y);
  }
  pop();
}

function startSimulation() {
  let phraseInput = select("#"+phraseID);
  phrase = phraseInput.value();
  if(phrase.length == 0) {
    console.log("Phrase is empty. Please try again.");
    return;
  }
  for(var i = 0; i < phrase.length; i++) {
    let character = phrase.charAt(i);
    if(validCharacters.indexOf(character) <= -1) {
      console.log("Phrase contains invalid character. Please try again.");
      return;
    }
  }
  initializePopulation();
}

function initializePopulation() {
  currentWords = Array();
  for (var i=0; i < population; i++) {
    currentWords.push(generateRandomWord(phrase.length))
  }
}

function generateRandomWord(wordLength) {
  let endPos = wordLength + 2;
  return Math.random().toString(36).substring(2, endPos);
}