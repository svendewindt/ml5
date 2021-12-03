console.log('ml5 version:', ml5.version);
let model;

function preload(){
  console.log(toPredict);
  console.log(trainingData.length);
}

function setup() {
  createCanvas(10, 10);
  output('Creating model');
  let options = {
    inputs: ["cap_shape", "cap_surface", "cap_color", "bruises", "odor", "gill_attachment", "gill_spacing", "gill_size", "gill_color", "stalk_shape", "stalk_root", "stalk_surface_above_ring", "stalk_surface_below_ring", "stalk_color_above_ring", "stalk_color_below_ring", "", "veil_color", "ring_number", "ring_type", "spore_print_color", "population", "habitat"],
    outputs: ['label'], //ML5 will find out how many outputs are necessary
    task: 'classification',
    debug: 'true'
  };
  model = ml5.neuralNetwork(options);
  addDataToModel();
  trainModel();
}

function addDataToModel(){
  output('Adding training data to model');
  var class_, capshape, cap_surface, cap_color, bruises, odor, gill_attachment, gill_spacing, gill_size, gill_color, stalk_shape, stalk_root, stalk_surface_above_ring, stalk_surface_below_ring, stalk_color_above_ring, stalk_color_below_ring, veil_color, ring_number, ring_type, spore_print_color, population, habitat;
  for (var i=0; i<trainingData.length; i++){
    cap_shape = trainingData[i].cap_shape;
    cap_surface = trainingData[i].cap_surface;
    cap_color = trainingData[i].cap_color;
    bruises = trainingData[i].bruises;
    odor = trainingData[i].odor;
    gill_attachment = trainingData[i].gill_attachment;
    gill_spacing = trainingData[i].gill_spacing;
    gill_size = trainingData[i].gill_size;
    gill_color = trainingData[i].gill_color;
    stalk_shape = trainingData[i].stalk_shape;
    stalk_root = trainingData[i].stalk_root;
    stalk_surface_above_ring = trainingData[i].stalk_surface_above_ring;
    stalk_surface_below_ring = trainingData[i].stalk_surface_below_ring;
    stalk_color_above_ring = trainingData[i].stalk_color_above_ring;
    stalk_color_below_ring = trainingData[i].stalk_color_below_ring;
    veil_color = trainingData[i].veil_color;
    ring_number = trainingData[i].ring_number;
    ring_type = trainingData[i].ring_type;
    spore_print_color = trainingData[i].spore_print_color;
    population = trainingData[i].population;
    habitat = trainingData[i].habitat;
    label = trainingData[i].class;
    model.addData([cap_shape, cap_surface, cap_color, bruises, odor, gill_attachment, gill_spacing, gill_size, gill_color, stalk_shape, stalk_root, stalk_surface_above_ring, stalk_surface_below_ring, stalk_color_above_ring, stalk_color_below_ring, veil_color, ring_number, ring_type, spore_print_color, population, habitat], [label]);
  }
  output('Start normalizing data');
  model.normalizeData();
  output('Finish normalizing data');
}

function trainModel(){
  output("Starting training");
  let options = {
    epochs: 5
  }
  model.train(options, whileTraining, finishedTraining);
}

function whileTraining(epoch, loss){
  output('Working on epoch: ' + epoch);
}

function finishedTraining(){
  output('Finished training');
  predict();
}

function predict(){
  var class_, capshape, cap_surface, cap_color, bruises, odor, gill_attachment, gill_spacing, gill_size, gill_color, stalk_shape, stalk_root, stalk_surface_above_ring, stalk_surface_below_ring, stalk_color_above_ring, stalk_color_below_ring, veil_color, ring_number, ring_type, spore_print_color, population, habitat;
  for (var i=0; i<toPredict.length; i++){
    cap_shape = toPredict[i].cap_shape;
    cap_surface = toPredict[i].cap_surface;
    cap_color = toPredict[i].cap_color;
    bruises = toPredict[i].bruises;
    odor = toPredict[i].odor;
    gill_attachment = toPredict[i].gill_attachment;
    gill_spacing = toPredict[i].gill_spacing;
    gill_size = toPredict[i].gill_size;
    gill_color = toPredict[i].gill_color;
    stalk_shape = toPredict[i].stalk_shape;
    stalk_root = toPredict[i].stalk_root;
    stalk_surface_above_ring = toPredict[i].stalk_surface_above_ring;
    stalk_surface_below_ring = toPredict[i].stalk_surface_below_ring;
    stalk_color_above_ring = toPredict[i].stalk_color_above_ring;
    stalk_color_below_ring = toPredict[i].stalk_color_below_ring;
    veil_color = toPredict[i].veil_color;
    ring_number = toPredict[i].ring_number;
    ring_type = toPredict[i].ring_type;
    spore_print_color = toPredict[i].spore_print_color;
    population = toPredict[i].population;
    habitat = toPredict[i].habitat;
    model.classify([cap_shape, cap_surface, cap_color, bruises, odor, gill_attachment, gill_spacing, gill_size, gill_color, stalk_shape, stalk_root, stalk_surface_above_ring, stalk_surface_below_ring, stalk_color_above_ring, stalk_color_below_ring, veil_color, ring_number, ring_type, spore_print_color, population, habitat], gotResults);
  }
}

function gotResults(error, results){
  if (error){
    console.error(error);
    return;
  } 
  console.log(results);
  var classifiaction;
  if (results[0].label == 'e') {classifiaction = 'edable';}
  if (results[0].label == 'p') {classifiaction = 'toxic';}
  var message = "Prediction for mushroom is <b>" + classifiaction + "</b> with " + (results[0].confidence * 100).toFixed(4) + "% certainty."
  output(message);
}

function output(result){
  console.log(result);
  document.getElementById("result").innerHTML = document.getElementById("result").innerHTML + '<br>' + result;
}
