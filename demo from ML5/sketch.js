console.log('ml5 version:', ml5.version);
let model;
let targetLabel = 'C';
let state = 'collection';

function setup() {
  createCanvas(400, 400);
  let options = {
    inputs: ['x', 'y'], 
    outputs: ['label'], //ML5 will find out how many outputs are necessary
    task: 'classification',
    debug: 'true'
  };
  model = ml5.neuralNetwork(options);
  background(220);
}

function keyPressed(){
    if (key == 't'){
      state = 'training';
      console.log("Starting training");
      model.normalizeData();
      let options = {
        epochs: 100 //number of rounds
      }
      model.train(options, whileTraining, finishedTraining); //whileTraining is called every epoch, the finishedTraining is called after all epochs
  } else {
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss){
  console.log(epoch);
}

function finishedTraining(){
  console.log('Finished training');
  state = 'prediction';
}

function mousePressed(){
  let inputs = {
    x: mouseX,
    y: mouseY
  }
  if (state == 'collection'){
    let target = {
      label: targetLabel
    }
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);    
  } else if (state == 'prediction') {
    model.classify(inputs, gotResults); // the model is trained. Here are the input, classify them for me
  }
}

function gotResults(error, results){
  if (error){
    console.error(error);
    return;
  } 
  
  console.log(results);
  var message = "Prediction is " + results[0].label + " with " + (results[0].confidence * 100).toFixed(2) + "% certainty."
  /*console.log(results[0]);
  console.log(results[0].labe);
  console.log(results[0].confidence);
  console.log(message)*/
  output(message);
  stroke(0);
  fill(0,0,255,100);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(results[0].label, mouseX, mouseY);  

}

function output(result){
  console.log(result);
  document.getElementById("result").innerHTML = result;
}

