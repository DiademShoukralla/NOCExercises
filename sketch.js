function setup() {
    createCanvas(800, 500);
  }
  
  function draw() {
    background(220);

    push();
    var welcome = "Welcome";
    textSize(100);
    text(welcome, 10, 100);
    fill(0, 102, 153);
    text(welcome, 10, 150);
    fill(0, 102, 153, 51);
    text(welcome, 10, 200);
    pop();

    push();
    var intro = "Use the top bar menu to try out an exercise!";
    let time = millis();
    textSize(30);
    text(intro, 10, 300);
    pop();
  }