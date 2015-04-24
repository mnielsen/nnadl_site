var neuronRadius = 45;
var defaultFont = "16px Arial";
var littleFont = "11px Arial";
var defaultLine = "#333"; 
var defaultText = "#333";
var defaultMathText = "#555";
var graphColor = "#FFA933";

$(function() {

    initialGradient();

    function initialGradient() {
	var initialGradientCanvas = $("#initial_gradient")[0];
	var initialGradientContext = initialGradientCanvas.getContext("2d");

	function layer(x) {
	    var l = [];
	    for (var j = 0; j < 6; j++) {
		l.push(new neuron(initialGradientContext, x, 65+100*j));
	    }
	    return l;
	}

	var xs = [60, 410];

	var hiddenLayer1 = layer(xs[0]);
	var hiddenLayer2 = layer(xs[1]);
	var allLayers = [hiddenLayer1, hiddenLayer2];
	connectLayers(hiddenLayer1, hiddenLayer2);

	initialGradientContext.text(
	    "hidden layer 1", xs[0], 10, 
	    {"font": "14px Arial", "text-align": "center"});
	initialGradientContext.text(
	    "hidden layer 2", xs[1], 10, 
	    {"font": "14px Arial", "text-align": "center"});

	$.getJSON("js/initial_gradient.json", function(data) {
	    var nn, error;
	    for (var l=0; l < 2; l++) {
		for (var n=0; n < 6; n++) {
		    nn = allLayers[l][n];
		    error = data[l][n];
		    initialGradientContext.line(
			nn.x, nn.y-0.5, nn.x, nn.y-0.5-error*700, graphColor, 10);
		};
	    };
	});

	var allNeurons = hiddenLayer1.concat(hiddenLayer2);
	allNeurons.forEach(function(n) {
	    initialGradientContext.line(n.x-10, n.y-0.5, n.x+10, n.y-0.5);
	});
    };
});


function sigmoid(x) {return 1/(1+Math.exp(-x));}
function s(x) {return sigmoid(x)*sigmoid(-x);}
var m = [40, 120, 50, 120];
var height = 290 - m[0] - m[2];
var width = 600 - m[1] - m[3];
var xmin = -5;
var xmax = 5;
var sample = 400;
var x1 = d3.scale.linear().domain([0, sample]).range([xmin, xmax]);
var data = d3.range(sample).map(function(d){ return {
        x: x1(d), 
        y: s(x1(d))}; 
    });
var x = d3.scale.linear().domain([xmin, xmax]).range([0, width]);
var y = d3.scale.linear()
                .domain([0, 0.25])
                .range([height, 0]);
var line = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); })
var graph = d3.select("#sigmoid_prime_graph")
    .append("svg")
    .attr("width", width + m[1] + m[3])
    .attr("height", height + m[0] + m[2])
    .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
var xAxis = d3.svg.axis()
                  .scale(x)
                  .tickValues(d3.range(-4, 5, 1))
                  .orient("bottom")
graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);
var yAxis = d3.svg.axis()
                  .scale(y)
                  .tickValues(d3.range(0, 0.26, 0.05))
                  .orient("left")
                  .ticks(5)
graph.append("g")
    .attr("class", "y axis")
    .call(yAxis);
graph.append("path").attr("d", line(data));
graph.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width/2)
     .attr("y", height+35)
     .text("z");
graph.append("text")
        .attr("x", (width / 2))             
        .attr("y", -10)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Derivative of sigmoid function");
