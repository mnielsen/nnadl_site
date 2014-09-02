var neuronRadius = 42;
var defaultFont = "16px Arial";
var littleFont = "11px Arial";
var defaultLine = "#555"; 
var defaultText = "#333";
var defaultMathText = "#555";
var graphColor = "#FFA933";


var initialGradientCanvas = $("#initial_gradient")[0];
var initialGradientContext = initialGradientCanvas.getContext("2d");

function layer(x) {
    var l = [];
    for (var j = 0; j < 6; j++) {
	l.push(new neuron(initialGradientContext, x, 57+100*j));
    }
    return l;
}

var xs = [50, 250, 450, 650]

var hiddenLayer1 = layer(xs[0]);
var hiddenLayer2 = layer(xs[1]);
var hiddenLayer3 = layer(xs[2]);
var allLayers = [hiddenLayer1, hiddenLayer2, hiddenLayer3];
connectLayers(hiddenLayer1, hiddenLayer2);
connectLayers(hiddenLayer2, hiddenLayer3);

initialGradientContext.text("hidden layer 1", xs[0], 10, 
			    {"font": "14px Arial", "text-align": "center"});
initialGradientContext.text("hidden layer 2", xs[1], 10, 
			    {"font": "14px Arial", "text-align": "center"});
initialGradientContext.text("hidden layer 3", xs[2], 10, 
			    {"font": "14px Arial", "text-align": "center"});

var allNeurons = hiddenLayer1.concat(hiddenLayer2, hiddenLayer3);
allNeurons.forEach(function(n) {
    initialGradientContext.line(n.x-5, n.y-0.5, n.x+5, n.y-0.5);
    });


$.getJSON("js/initial_gradient.json", function(data) {
    var nn, error;
    for (var l=0; l < 3; l++) {
	for (var n=0; n < 6; n++) {
	    nn = allLayers[l][n];
	    error = data[l][n];
	    console.log(error);
	    initialGradientContext.line(
		nn.x, nn.y, nn.x, nn.y-error*526, "red", 5);
	};
    };
});

