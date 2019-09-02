let population = 200; // Population of 100 entities
let mutation = 0.01; // 1% mutation rate. Probability that a character will be mutated.
let totalGenerations = 1; // How many generations have occured.
let avgFitness = 0; // Average "fitness" score of the population.
let phrase = ""; // Goal Phrase

let phraseID = "phraseInput";
let submitID = "submitButton";
let modalID = "modal";
let canvasID = "canvas";

let currentWords;
let currentFitnesses;
let wordWidth;

let modal;

let validCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.'!?";

function setup() {
    createCanvas(800, 500).id(canvasID);

    modal = createDiv();
    modal.id(modalID);
    modal.center();

    let phraseInput = createInput();
    phraseInput.attribute("placeholder", "Goal Phrase");
    phraseInput.id(phraseID);
    phraseInput.parent(modal);
  
    let startButton = createButton('GO');
    startButton.mouseClicked(startSimulation);
    startButton.id(submitID);
    startButton.parent(modal);

}
  
function draw() {
    background(220);
    modal.show();
    if (currentWords) {
      drawAttributes();
      drawCurrentWords();
      update();
      modal.hide();
    }
}

function getPercent(decimal){
  return (decimal * 100).toFixed(2) + "%";
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
  fill('blue');
  text("Press 'r' to restart", 50, 300);
  pop();
}

// PreCondition: word and phrase are of same length
function calculateFitness(word){
  let score = 0;
  for(var i = 0; i < word.length; i++) {
    if (word.charAt(i) === phrase.charAt(i)) {
        score ++;
    }
  }
  return map(score, 0, word.length, 0, 1);
}

function update() {
  if (currentWords.indexOf(phrase) > -1) {
    // Goal phrase already in population
    return;
  }
  updatePopulation();
  updateAttributes();
}

function updatePopulation() {
  childWords = new Array();
  childFitnesses = new Array();
  for (var i = 0; i < population; i++) {
    let child = generateChild(getParent(), getParent());
    childWords.push(child);
    childFitnesses.push(calculateFitness(child));
  }
  currentWords = childWords;
  currentFitnesses = childFitnesses;
}

function updateAttributes() {
  avgFitness = currentFitnesses.reduce(function(sum, currentFit) {return sum += currentFit}) / currentFitnesses.length;
  totalGenerations ++;
}

function getParent() {
  let maxFitness = Math.max(...currentFitnesses);
  let r = map(Math.random(), 0, 1, 0, maxFitness);
  let index = Math.floor(Math.random() * currentWords.length);
  while(r > currentFitnesses[index]) {
    // If parent not fit enough, will pick a random other parent
    r = map(Math.random(), 0, 1, 0, maxFitness);
    index = Math.floor(Math.random() * currentWords.length);
  }

  return currentWords[index];
}

// Compute child of parent1 and parent2 with mutation. 
// PreCondition: parent1 and parent2 are same length
function generateChild(parent1, parent2) {
  let child = "";
  for(var i = 0; i < parent1.length; i++) {
    let r = Math.random();
    let character;
    if(r < mutation) {
      let newCharIndex = Math.floor(Math.random() * validCharacters.length);
      character = validCharacters.charAt(newCharIndex);
    } else if(i % 2 == 0) {
      character = parent1.charAt(i);
    } else {
      character = parent2.charAt(i);
    }
    child += character;
  }

  return child;
}

function drawCurrentWords() {
  push();
  let xCounter = 0;
  let yCounter = 1;
  for(var i = 0; i< currentWords.length; i++) {
    y = yCounter*10;
    if(y >= height) {
      yCounter = 1;
      y = yCounter*10;
      xCounter ++;
    }
    yCounter++;
    if (calculateFitness(currentWords[i]) == 1) {
      fill('red');
    }
    text(currentWords[i], 200 + (xCounter*wordWidth), y);
    fill('black');
  }
  pop();
}

function startSimulation() {
  totalGenerations = 1;
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
  currentWords = new Array();
  currentFitnesses = new Array();
  for (var i=0; i < population; i++) {
    let word = generateRandomWord(phrase.length);
    currentWords.push(word);
    currentFitnesses.push(calculateFitness(word));
  }
  wordWidth = textWidth(currentWords[0]) + 25;
}

function generateRandomWord(wordLength) {
  let word = "";
  for(var i = 0; i < wordLength; i++) {
    let index = Math.floor(Math.random()*validCharacters.length);
    let character = validCharacters.charAt(index);
    word += character;
  }
  return word;
}

function keyTyped() {
  if(key === 'r' || key === 'R') {
    currentWords = null;
    currentFitnesses = null;
    let phraseInput = select("#"+phraseID);
    phraseInput.value("");
  }
}