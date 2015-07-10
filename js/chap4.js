var neuronRadius = 25;
var defaultFont = "16px Arial";
var littleFont = "11px Arial";
var defaultLine = "#333"; 
var defaultText = "#333";
var defaultMathText = "#555";
var graphColor = "#FFA933";
var graphColorAlt = "#2A6EA6";

var scrubbableFont = "26px MJX_Math";
var littleScrubbableFont = "18px MJX_Math";
var scrubbableColor = "#2A6EA6";

window.onload = function() {
    // We need to wait for the window to finish loading, in order to
    // ensure the web fonts used on the canvas have finished loading.
    // It's possible to do this faster -- see the solution from Thomas
    // Bachem at http://stackoverflow.com/q/4383226 -- but all the
    // solutions I know of are hacks. I've gone for this solution
    // since: (a) it's easy, and (b) all it delays are the canvas
    // elements.  Note the use of the style in the main document --
    // this also seems to be necessary.
    sampleFunction("#function");
    basicNetwork();
    vectorValuedNetwork();
    biggerNetwork();
    sampleFunction("#function_2");
    twoHiddenNeurons();
    basicManipulation();
    step();
    stepParameterization();
    twoHNN();
    bumpFn();
    doubleBump();
    fiveBumps();
    sampleFunction("#function_3");
    invertedFunction("#inverted_function");
    designFunction();
    twoInputs();
    tIGraph();
    tIGR();
    yStep();
    bump3d();
    bumpY();
    xYBump();
    tower();
    manyTowers("many_towers");
    towerConstruction();
    manyTowers("many_towers_2");
    towerND();
    theTwoTowers();
    sigmoidLike("#sigmoid", String.fromCharCode(963)+"(z)", sigma);
    sigmoidLike("#sigmoid_like", "s(z)", sLike);
    ramping();
    failure();
    invertedFunction("#inverted_function_2");
    seriesOfBumps("#series_of_bumps", 0.0, [-1.3, -1.8, -0.5, -0.9, 0.3]);
    seriesOfBumps("#half_bumps", 0.0, [-1.3/2, -1.8/2, -0.5/2, -0.9/2, 0.3/2]);
    seriesOfBumps("#shifted_bumps", 0.1, [-1.55/2, -1.15/2, -0.7/2, -0.6/2, 0.3]);

};

function sampleFunction(id) {
    var sampleFunctionCanvas = $(id)[0];
    var sampleFunctionContext = sampleFunctionCanvas.getContext("2d");
    sampleFunctionContext.arrow(20.5, 280.5, 280.5, 280.5, defaultLine);
    sampleFunctionContext.arrow(20.5, 280.5, 20.5, 20.5, defaultLine);
    function f(x) {return 0.2+0.4*x*x+0.3*x*Math.sin(15*x)+0.05*Math.cos(50*x);}
    var xScale = scale(0, 1, 20.5, 280.5);
    var yScale = scale(0, 1, 280.5, 20.5);
    var xRange = range(0, 1, 0.01);
    sampleFunctionContext.mathText(
	"x", xScale(1)+8, yScale(0)+3, {"size": 14});
    sampleFunctionContext.mathText("f(x)", 140, 20);
    var data = xRange.map(function(x) {return {"x": x, "y": f(x)} });
    sampleFunctionContext.plot(data, xScale, yScale, graphColorAlt);
}

function basicNetwork() {
    var basicNetworkCanvas = $("#basic_network")[0];
    var basicNetworkContext = basicNetworkCanvas.getContext("2d");
    var neuronIn = new neuron(basicNetworkContext, 50, 110, "x");
    var neuronOut = new neuron(basicNetworkContext, 250, 110);
    var hiddenLayer = [];
    for (var j = 0; j < 3; j++) {
	hiddenLayer.push(new neuron(basicNetworkContext, 150, 35+75*j));
    }
    connectLayers([neuronIn], hiddenLayer);
    connectLayers(hiddenLayer, [neuronOut]);
    neuronOut.output("f(x)");
}

function vectorValuedNetwork() {
    var vectorValuedNetworkCanvas = $("#vector_valued_network")[0];
    var vectorValuedNetworkContext = vectorValuedNetworkCanvas.getContext("2d");
    var layerIn = [];
    for (var j = 0; j < 3; j++) {
	layerIn.push(new neuron(
	    vectorValuedNetworkContext, 50, 110+75*j, "x_"+(j+1)));
    }
    var hiddenLayer= [];
    for (var j = 0; j <5; j++) {
	hiddenLayer.push(new neuron(
	    vectorValuedNetworkContext, 150, 35+75*j));
    }
    var neuron31 = new neuron(vectorValuedNetworkContext, 250, 147);
    var neuron32 = new neuron(vectorValuedNetworkContext, 250, 222);
    var layerOut = [neuron31, neuron32];
    connectLayers(layerIn, hiddenLayer);
    connectLayers(hiddenLayer, layerOut);
    neuron31.output("f^1(x_1, x_2, x_3)");
    neuron32.output("f^2(x_1, x_2, x_3)");
}

function biggerNetwork() {
    var biggerNetworkCanvas = $("#bigger_network")[0];
    var biggerNetworkContext = biggerNetworkCanvas.getContext("2d");
    var neuronIn = new neuron(biggerNetworkContext, 50, 185, "x");
    var neuronOut = new neuron(biggerNetworkContext, 250, 185);
    var hiddenLayer = [];
    for (var j = 0; j < 5; j++) {
	hiddenLayer.push(new neuron(biggerNetworkContext, 150, 35+75*j));
    }
    connectLayers([neuronIn], hiddenLayer);
    connectLayers(hiddenLayer, [neuronOut]);
    neuronOut.output("f(x)");
}

function twoHiddenNeurons() {
    var tHNCanvas = $("#two_hidden_neurons")[0];
    var tHNContext = tHNCanvas.getContext("2d");
    var neuronIn = new neuron(tHNContext, 50, 110, "x");
    var neuronOut = new neuron(tHNContext, 250, 110);
    var hiddenLayer = [];
    for (var j = 0; j < 2; j++) {
	hiddenLayer.push(new neuron(tHNContext, 150, 35+150*j));
    }
    connectLayers([neuronIn], hiddenLayer);
    connectLayers(hiddenLayer, [neuronOut]);
    neuronOut.output();
}


function basicManipulation() {
    var bMCanvas = $("#basic_manipulation")[0];
    var bMContext = bMCanvas.getContext("2d");
    var w = new scrubbable(
	"#basic_manipulation", 20, 102, 110, 132, 8, "w = ", drawBM, 
	    {"min": -999, "max": 999});
    var b = new scrubbable(
	"#basic_manipulation", 105, 40, 195, 70, -4, "b = ", drawBM, 
	    {"min": -999, "max": 999});
    drawBM();
    function drawBM() {
	bMContext.clear();
	drawBasicNN(bMContext);
	drawGraphAxes(bMContext, "Output from top hidden neuron");
	plotGraph(bMContext, function f(x) {
	    return 1/(1+Math.exp(-w.value*x-b.value))});
	w.draw();
	b.draw();
    }    
}

function step() {
    var stepCanvas = $("#step")[0];
    var stepContext = stepCanvas.getContext("2d");
    var w = new scrubbable(
	"#step", 20, 102, 110, 132, 100, "w = ", drawStep,
	{"min": -999, "max": 999});
    var b = new scrubbable(
	"#step", 105, 40, 195, 70, -40, "b = ", drawStep,
	{"min": -999, "max": 999});
    drawStep();
    function drawStep() {
	stepContext.clear();
	drawBasicNN(stepContext);
	drawGraphAxes(stepContext, "Output from top hidden neuron", false);
	plotGraph(stepContext, function f(x) {
	    return 1/(1+Math.exp(-w.value*x-b.value))});
	w.draw();
	b.draw();
	if (0 <= -b.value/w.value && -b.value/w.value <= 1) {
	    var xScale = scale(0, 1, 360.5, 544.5);
	    var s = (-b.value/w.value).toFixed(2);
	    var x = Math.round(xScale(-b.value/w.value))+0.5;
	    stepContext.mathText("-b/w = "+s, x, 195,
			     {"text-align": "center"});
	    stepContext.line(x, 169.5, x, 15.5, "#d0d0d0", 1);
	    stepContext.line(361.5, 14.5, 560.5, 14.5, "#d0d0d0", 1);
	}
    }    
}

function stepParameterization() {
    var stepPCanvas = $("#step_parameterization")[0];
    var stepPContext = stepPCanvas.getContext("2d");
    var s = new scrubbable(
	"#step_parameterization", 105, 40, 195, 70, 0.40, "s = ", drawStepP,
	{"increment": 0.01,
	 "formatter": function(x) {return x.toFixed(2)}});
    drawStepP();
    function drawStepP() {
	stepPContext.clear();
	drawBasicNN(stepPContext);
	drawGraphAxes(stepPContext, "Output from top hidden neuron");
	plotSteps(stepPContext, [{"s": s.value, "w": 1}]);
	s.draw();
    }    
}


function twoHNN() {
    var twoHNNCanvas = $("#two_hn_network")[0];
    var twoHNNContext = twoHNNCanvas.getContext("2d");
    var s1 = new scrubbable(
	"#two_hn_network", 100, 40, 200, 75, 0.40, "s_1 = ", drawTwoHNN,
	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var s2 = new scrubbable(
	"#two_hn_network", 100, 185, 200, 220, 0.60, "s_2 = ", drawTwoHNN,
	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var w1 = new scrubbable(
	"#two_hn_network", 190, 90, 290, 125, 0.6, "w_1 = ", drawTwoHNN,
	{"min": -9.9, "max": 9.9, "increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    var w2 = new scrubbable(
	"#two_hn_network", 190, 210, 290, 245, 1.2, "w_2 = ", drawTwoHNN,
	{"min": -9.9, "max": 9.9, "increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    drawTwoHNN();
    function drawTwoHNN() {
	twoHNNContext.clear();
	drawBasicNN(twoHNNContext);
	drawGraphAxes(
	    twoHNNContext, 
	    "Weighted output from hidden layer",
	    true,
	    [-1, 1, 2],
	    -1.5);
	plotSteps(
	    twoHNNContext, 
	    [{"s": s1.value, "w": w1.value}, {"s": s2.value, "w": w2.value}],
	    2);
	s1.draw();
	s2.draw();
	w1.draw();
	w2.draw();
    }    
}

function bumpFn() {
    var bumpFnCanvas = $("#bump_fn")[0];
    var bumpFnContext = bumpFnCanvas.getContext("2d");
    var s1 = new scrubbable(
	"#bump_fn", 115, 80, 185, 110, 0.40, "", drawBumpFn,
	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var s2 = new scrubbable(
	"#bump_fn", 115, 230, 185, 260, 0.60, "", drawBumpFn,
	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var h = new scrubbable(
	"#bump_fn", 205, 50, 295, 80, 0.6, "h = ", drawBumpFn,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    var w1, w2;
    drawBumpFn();
    function drawBumpFn() {
	bumpFnContext.clear();
	drawBasicNN(bumpFnContext);
	drawGraphAxes(
	    bumpFnContext, 
	    "Weighted output from hidden layer",
	    true,
	    [-1, 1, 2],
		-1.5);
	plotSteps(
	    bumpFnContext, 
	    [{"s": s1.value, "w": h.value}, {"s": s2.value, "w": -h.value}],
	    2);
	s1.draw();
	s2.draw();
	h.draw();
	bumpFnContext.mathText(
	    String(h.value.toFixed(1)), 225, 125,
	    {"font": scrubbableFont, 
	     "littleFont": littleScrubbableFont,
	     "color": "#888",
	     "text-align": "center",
	     "textBaseline": "top",
	     "down": 12});
	bumpFnContext.mathText(
	    String(-h.value.toFixed(1)), 225, 225,
	    {"font": scrubbableFont, 
	     "littleFont": littleScrubbableFont,
	     "color": "#888",
	     "text-align": "center",
	     "textBaseline": "top",
	     "down": 12});
    }    

}


function doubleBump() {
    var doubleBumpCanvas = $("#double_bump")[0];
    var doubleBumpContext = doubleBumpCanvas.getContext("2d");
    var s1 = new scrubbable(
     	"#double_bump", 115, 15, 185, 45, 0.40, "", drawDoubleBump,
     	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var s2 = new scrubbable(
     	"#double_bump", 115, 65, 185, 95, 0.60, "", drawDoubleBump,
     	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var s3 = new scrubbable(
     	"#double_bump", 115, 165, 185, 195, 0.70, "", drawDoubleBump,
     	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var s4 = new scrubbable(
     	"#double_bump", 115, 215, 185, 245, 0.90, "", drawDoubleBump,
     	{"increment": 0.01,
         "formatter": function(x) {return x.toFixed(2)}});
    var h1 = new scrubbable(
     	"#double_bump", 210, 55, 300, 85, -1.2, "h = ", drawDoubleBump,
     	{"increment": 0.1,
     	 "formatter": function(x) {return x.toFixed(1)}});
    var h2 = new scrubbable(
     	"#double_bump", 210, 180, 300, 210, 0.3, "h = ", drawDoubleBump,
     	{"increment": 0.1,
     	 "formatter": function(x) {return x.toFixed(1)}});
    drawDoubleBump();
    function drawDoubleBump() {
	doubleBumpContext.clear();
	draw4NN(doubleBumpContext);
	drawGraphAxes(
	    doubleBumpContext, 
	    "Weighted output from hidden layer",
	    true,
	    [-1, 1, 2],
		-1.5);
	plotSteps(
	    doubleBumpContext, 
	    [{"s": s1.value, "w": h1.value}, {"s": s2.value, "w": -h1.value},
	     {"s": s3.value, "w": h2.value}, {"s": s4.value, "w": -h2.value}],
	    2);
	s1.draw();
     	s2.draw();
	s3.draw();
	s4.draw();
	h1.draw();
	h2.draw();
    }
}


function draw4NN(context) {
    var neuronIn = new neuron(context, 30, 130, "x");
    var neuronOut = new neuron(context, 270, 130);
    var hiddenLayer = [];
    hiddenLayer.push(new neuron(context, 150, 30));
    hiddenLayer.push(new neuron(context, 150, 80));
    hiddenLayer.push(new neuron(context, 150, 180));
    hiddenLayer.push(new neuron(context, 150, 230));
    connectLayers([neuronIn], hiddenLayer);
    connectLayers(hiddenLayer, [neuronOut]);
    neuronOut.output();    
}

function fiveBumps() {
    var fiveBumpsCanvas = $("#five_bumps")[0];
    var fiveBumpsContext = fiveBumpsCanvas.getContext("2d");
    var s1 = [], s2 = [];
    for (var j = 0; j < 5; j++) {
	s1[j] = 0.2*j;
	s2[j] = 0.2*(j+1);
    }
    var h = fiveScrubbables("#five_bumps", drawFiveBumps);
    function scrubbing() {
	return (h[0].scrubbing || h[1].scrubbing || h[2].scrubbing ||
		h[3].scrubbing || h[4].scrubbing);
    }
    var yScale = scale(0, 2, 170.5, 14.5);
    var column;
    var highlightColumn = false;
    var scrubbingGraph;
    var newY;
    $("#five_bumps").mousedown(function(e) {
	mP = mousePosition(e, fiveBumpsCanvas);
	if (!scrubbing() && mP.x >= 361 && mP.x <= 544
	    && mP.y >= yScale(2) && mP.y <= yScale(-1.5)) {
	    scrubbingGraph = true;
	    column = Math.floor((mP.x-361) / 37);
	    newY = (2.0*(mP.y-170.5)/(14.5-170.5));
	    h[column].value = newY;
	    drawFiveBumps();
	} else {
	    scrubbingGraph = false;
	}
    });
    $("#five_bumps").mouseup(function(e) {
	if (scrubbingGraph) {scrubbingGraph = false;}
    });
    $("#five_bumps").mousemove(function(e) {
	mP = mousePosition(e, fiveBumpsCanvas);
	if (!scrubbing() && mP.x >= 361 && mP.x <= 544
	    && mP.y >= yScale(2) && mP.y <= yScale(-1.5)) {
	    highlightColumn = true;
	    column = Math.floor((mP.x-361) / 37);
	    if (scrubbingGraph) {
		newY = (2.0*(mP.y-170.5)/(14.5-170.5));
		h[column].value = newY;
	    }
	    drawFiveBumps();
	} else if (highlightColumn === true) {
	    highlightColumn = false;
	    drawFiveBumps();
	}
    });
    drawFiveBumps();
    function drawFiveBumps() {
	fiveBumpsContext.clear();
	var neuronIn = new neuron(fiveBumpsContext, 30, 310, "x");
	var neuronOut = new neuron(fiveBumpsContext, 270, 310);
	var hiddenLayer = [];
	for (var j = 0; j < 5; j++) {
	    h[j].draw();
	    hiddenLayer.push(
		new neuron(fiveBumpsContext, 150, 43+120*j, s1[j].toFixed(1)));
	    hiddenLayer.push(
		new neuron(fiveBumpsContext, 150, 96+120*j, s2[j].toFixed(1)));
	}
	connectLayers([neuronIn], hiddenLayer, "#aaa");
	connectLayers(hiddenLayer, [neuronOut], "#aaa");
	hiddenLayer.forEach(function(n) {n.draw();});
	neuronOut.output();    
	if (highlightColumn) {
	    fiveBumpsContext.filledRectangle(
		360.5+36.8*column, yScale(-1.5), 397.3+36.8*column,
		yScale(2), "white", "#ddd", 0);
	}
	drawGraphAxes(
	    fiveBumpsContext, 
	    "Weighted output from hidden layer",
	    true,
	    [-1, 1, 2], 
		-1.5);
	plotSteps(
	    fiveBumpsContext, 
	    [{"s": s1[0], "w": h[0].value}, {"s": s2[0], "w": -h[0].value},
	     {"s": s1[1], "w": h[1].value}, {"s": s2[1], "w": -h[1].value},
	     {"s": s1[2], "w": h[2].value}, {"s": s2[2], "w": -h[2].value},
	     {"s": s1[3], "w": h[3].value}, {"s": s2[3], "w": -h[3].value},
	     {"s": s1[4], "w": h[4].value}, {"s": s2[4], "w": -h[4].value}],
	    2);
    }
}

function fiveScrubbables(id, draw) {
    var h = [];
    h[0] = new scrubbable(
	id, 175, 56, 265, 86,
	(Math.round(Math.random()*30)-15)/10, "h = ", draw,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    h[1] = new scrubbable(
	id, 220, 176, 310, 206,
	(Math.round(Math.random()*30)-15)/10, "h = ", draw,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    h[2] = new scrubbable(
	id, 250, 250, 340, 280,
	(Math.round(Math.random()*30)-15)/10, "h = ", draw,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    h[3] = new scrubbable(
	id, 220, 416, 310, 446,
	(Math.round(Math.random()*30)-15)/10, "h = ", draw,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    h[4] = new scrubbable(
	id, 175, 536, 265, 566,
	(Math.round(Math.random()*30)-15)/10, "h = ", draw,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)}});
    return h;
}


function invertedFunction(id) {
    var invertedFunctionCanvas = $(id)[0];
    var invertedFunctionContext = invertedFunctionCanvas.getContext("2d");
    var xScale = scale(0, 1, 20.5, 280.5);
    var yScale = scale(-2, 2, 280.5, 20.5);
    invertedFunctionContext.arrow(xScale(0), yScale(0), xScale(1.05), 
				  yScale(0), defaultLine);
    invertedFunctionContext.arrow(xScale(0), yScale(-3), xScale(0), 
				  yScale(2.15), defaultLine);
    invertedFunctionContext.line(xScale(1), yScale(0), xScale(1), 
				 yScale(-0.05), defaultLine);
    invertedFunctionContext.mathText(
	"x", xScale(1.05)+8, yScale(0)+3, {"size": 14});
    invertedFunctionContext.text("1", xScale(1.0)-3, yScale(0)+14,
				    {"font": "11px Arial"});
    for (var j = -2; j <= 2; j++) {
	if (j !== 0) {
	    invertedFunctionContext.line(
		xScale(-0.01), yScale(j), xScale(0), yScale(j));
	}
	invertedFunctionContext.text(j, xScale(-0.05+0.01*j.sign()), 
				     yScale(j-0.04), {"font": "11px Arial"});
    }
    invertedFunctionContext.mathText(
	String.fromCharCode(963)+"^-^1"+String.fromCharCode(8728)+"f(x)", 140, 18);
    function sigmaInverse(z) {return Math.log(z/(1-z));}
    function f(x) {return 0.2+0.4*x*x+0.3*x*Math.sin(15*x)+0.05*Math.cos(50*x);}
    var xRange = range(0, 1, 0.01);
    var data = xRange.map(function(x) {return {"x": x, "y": sigmaInverse(f(x))} });
    invertedFunctionContext.plot(data, xScale, yScale, graphColorAlt);
}


function designFunction() {
    var designFunctionCanvas = $("#design_function")[0];
    var designFunctionContext = designFunctionCanvas.getContext("2d");
    var s1 = [], s2 = [];
    for (var j = 0; j < 5; j++) {
	s1[j] = 0.2*j;
	s2[j] = 0.2*(j+1);
    }
    var h = fiveScrubbables("#design_function", drawDesignFunction);
    function scrubbing() {
	return (h[0].scrubbing || h[1].scrubbing || h[2].scrubbing ||
		h[3].scrubbing || h[4].scrubbing);
    }
    var b = new button(
	"#design_function", 360.5, 355, 430, 380, "Reset", drawDesignFunction,
	function() {
	    for (var j = 0; j < 5; j++) {
		h[j].value = (Math.round(Math.random()*30)-15)/10;
	    }
	});
    var yScale = scale(0, 3, 170.5, 14.5);
    var column;
    var highlightColumn = false;
    var scrubbingGraph;
    var newY;
    $("#design_function").mousedown(function(e) {
	mP = mousePosition(e, designFunctionCanvas);
	if (!scrubbing() && mP.x >= 361 && mP.x <= 544
	    && mP.y >= yScale(3) && mP.y <= yScale(-2.2)) {
	    scrubbingGraph = true;
	    column = Math.floor((mP.x-361) / 37);
	    newY = (3.0*(mP.y-170.5)/(14.5-170.5));
	    h[column].value = newY;
	    drawDesignFunction();
	} else {
	    scrubbingGraph = false;
	}
    });
    $("#design_function").mouseup(function(e) {
	if (scrubbingGraph) {scrubbingGraph = false;}
    });
    $("#design_function").mousemove(function(e) {
	mP = mousePosition(e, designFunctionCanvas);
	if (!scrubbing() && mP.x >= 361 && mP.x <= 544
	    && mP.y >= yScale(3) && mP.y <= yScale(-2.3)) {
	    highlightColumn = true;
	    column = Math.floor((mP.x-361) / 37);
	    if (scrubbingGraph) {
		newY = (3.0*(mP.y-170.5)/(14.5-170.5));
		h[column].value = newY;
	    }
	    drawDesignFunction();
	} else if (highlightColumn === true) {
	    highlightColumn = false;
	    drawDesignFunction();
	}
    });
    drawDesignFunction();
    function drawDesignFunction() {
	designFunctionContext.clear();
	var neuronIn = new neuron(designFunctionContext, 30, 310, "x");
	var neuronOut = new neuron(designFunctionContext, 270, 310);
	var hiddenLayer = [];
	for (var j = 0; j < 5; j++) {
	    h[j].draw();
	    hiddenLayer.push(
		new neuron(designFunctionContext, 150, 43+120*j, s1[j].toFixed(1)));
	    hiddenLayer.push(
		new neuron(designFunctionContext, 150, 96+120*j, s2[j].toFixed(1)));
	}
	connectLayers([neuronIn], hiddenLayer, "#aaa");
	connectLayers(hiddenLayer, [neuronOut], "#aaa");
	hiddenLayer.forEach(function(n) {n.draw();});
	if (highlightColumn) {
	    designFunctionContext.filledRectangle(
		360.5+36.8*column, yScale(-2.3), 397.3+36.8*column,
		yScale(3), "white", "#ddd", 0);
	}
	neuronOut.output();    
	drawGraphAxes(
	    designFunctionContext, 
	    "Weighted output from hidden layer",
	    true,
	    [-2, -1, 1, 2, 3], 
		-2.5);
	plotSteps(
	    designFunctionContext, 
	    [{"s": s1[0], "w": h[0].value}, {"s": s2[0], "w": -h[0].value},
	     {"s": s1[1], "w": h[1].value}, {"s": s2[1], "w": -h[1].value},
	     {"s": s1[2], "w": h[2].value}, {"s": s2[2], "w": -h[2].value},
	     {"s": s1[3], "w": h[3].value}, {"s": s2[3], "w": -h[3].value},
	     {"s": s1[4], "w": h[4].value}, {"s": s2[4], "w": -h[4].value}],
	    3);
	// Plot the goal function
	var xScale2 = scale(0, 1, 360.5, 544.5);
	var yScale2 = scale(0, 3, 170.5, 14.5);
	function sigmaInverse(z) {return Math.log(z/(1-z));}
	function f(x) {return 0.2+0.4*x*x+0.3*x*Math.sin(15*x)+0.05*Math.cos(50*x);}
	var xRange = range(0, 1, 0.01);
	var data = xRange.map(
	    function(x) {return {"x": x, "y": sigmaInverse(f(x))} });
	designFunctionContext.plot(data, xScale2, yScale2, graphColorAlt, 0.7);
	// Display the score
	var x, bin, score = 0;
	for (var j = 0; j < xRange.length; j++) {
	    // x = xRange[j];
	    bin = Math.floor(j/20);
	    score += Math.abs(data[j].y-h[bin].value)/100.0;
	}
	designFunctionContext.text(
	    "Average deviation: "+score.toFixed(2), 360.5, 325);
	if (score < 0.405) {
	    designFunctionContext.text(
		"Success!", 360.5, 345);
	}
	// Draw the button
	b.draw();
	// update the text
	$("#h").text(h[0].value.toFixed(1));
	$("#w1").text(h[0].value.toFixed(1));
	$("#w2").text((-h[0].value).toFixed(1));
    }
}

function twoInputs() {
    var twoInputsCanvas = $("#two_inputs")[0];
    var twoInputsContext = twoInputsCanvas.getContext("2d");
    var inputLayer = [];
    var labels = ["x", "y"];
    for (var j = 0; j < 2; j++) {
	inputLayer.push(new neuron(twoInputsContext, 50, 35+150*j, labels[j]));
    }
    var neuronOut = new neuron(twoInputsContext, 150, 110);
    connectLayers(inputLayer, [neuronOut]);
    neuronOut.output();
    twoInputsContext.mathText("w_1", 95, 65);
    twoInputsContext.mathText("w_2", 95, 163);
    twoInputsContext.mathText("b", 150, 80, {"text-align": "center"});
}

function tIGraph() {
    var tIGCanvas = $("#ti_graph")[0];
    var tIGContext = tIGCanvas.getContext("2d");
    var w1 = new scrubbable(
	"#ti_graph", 80, 45, 130, 75, 8, "", drawTIGraph, 
	    {"min": -999, "max": 999});
    var b = new scrubbable(
	"#ti_graph", 125, 55, 175, 85, -5, "", drawTIGraph,
	    {"min": -999, "max": 999});
    function zFn(x, y) {return sigma(w1.value*x+b.value);}
    var graph = new graph3D("ti_graph_3d", "Output", "100px", zFn, 50, 2);
    function test() {return (b.changing || w1.changing);}
    drawTIGraph();
    function drawTIGraph() {
	tIGContext.clear();
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(tIGContext, 50, 35+150*j, labels[j]));
	}
	var neuronOut = new neuron(tIGContext, 150, 110);
	connectLayers(inputLayer, [neuronOut]);
	neuronOut.output();
	tIGContext.mathText("0", 105, 165, {"text-align": "center"});
	w1.draw();
	b.draw();
	graph.redraw(test);
    };
}


function convertFn(zFn) {
    var xMin = 0, xMax = 1, xRange = xMax - xMin;
    var yMin = 0, yMax = 1, yRange = yMax - yMin;
    function meshFn(x, y) {
	x = xMin+x*xRange;
	y = yMin+y*yRange;
	return new THREE.Vector3(x, y, zFn(x,y));
    };
    return meshFn;
}

function graph3D(id, title, xPosition, zFn, segmentX, segmentY) {
    // Number of segments in each direction, default is 20
    this.segmentX = selfOrDefault(segmentX, 20);
    this.segmentY = selfOrDefault(segmentY, 20);
    // Add the function
    this.zFn = zFn;
    // Scene, camera, renderer, lighting
    var WIDTH = 240, HEIGHT = 220;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 100);
    this.camera.position.set(-0.4, -1.5, 0.8);
    this.camera.up = new THREE.Vector3(0, 0, 1 );
    this.camera.lookAt(new THREE.Vector3(0.4, 0, 0.6));
    this.scene.add(this.camera);
    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setSize(WIDTH, HEIGHT);
    this.renderer.setClearColor(0xdddddd, 1);
    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0.2, 0.2, 1.1);
    this.scene.add(dirLight);
    this.scene.add(new THREE.AmbientLight(0x333333));

    // Add axes
    var origin = new THREE.Vector3(0, 0, 0);
    var arrow1 = new THREE.ArrowHelper(
	new THREE.Vector3(1, 0, 0), origin, 1.4, 0x555555);
    var arrow2 = new THREE.ArrowHelper(
	new THREE.Vector3(0, 1, 0), origin, 1.5, 0x555555);
    var arrow3 = new THREE.ArrowHelper(
	new THREE.Vector3(0, 0, 1), origin, 1.2, 0x555555);

    var notch1 = new THREE.ArrowHelper(
	new THREE.Vector3(0, -1, 0), new THREE.Vector3(1, 0, 0),
	0.08, 0x555555);
    var notch2 = new THREE.ArrowHelper(
	new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 1, 0),
	0.06, 0x555555);
    this.scene.add(arrow1, arrow2, arrow3);
    this.scene.add(notch1, notch2);
    this.createMesh(convertFn(this.zFn));    
    this.renderer.render(this.scene, this.camera);

    // Add to DOM
    document.getElementById(id).appendChild(this.renderer.domElement);

    $("#"+id).append(
	"<span class='graph3D' style='top: 190px; left: 180px;'>x=<span style='font-family: MJX_Main'>1</span></span>");
    $("#"+id).append(
	"<span class='graph3D' style='font-size: 14px; top: 170px; left: 3px;'>y=<span style='font-family: MJX_Main'>1</span></span>");

    $("#"+id).append(
	"<span class='graph3D' style='font: 14px Georgia; top: 10px; left: "+xPosition+";'>"+title+"</span>");
}

graph3D.prototype.createMesh = function(meshFn) {
    this.material = new THREE.MeshLambertMaterial({
	specular: 0xaaaaaa, 
	emissive: 0x222222,
	color: 0xff5555, 
	shininess: 80, 
	metal: true,
	wireframeLinewidth: 0.0,
	alphaMap: 0xffffff,
	side: THREE.DoubleSide});
    this.geometry = new THREE.ParametricGeometry( 
	meshFn, this.segmentX, this.segmentY, true );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
}

graph3D.prototype.updateMesh = function() {
    for (var j = 0; j < this.mesh.geometry.vertices.length; j++) {
	this.mesh.geometry.vertices[j].z = this.zFn(
	    this.mesh.geometry.vertices[j].x, this.mesh.geometry.vertices[j].y);
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    this.mesh.geometry.computeFaceNormals();
    // this.mesh.geometry.computeVertexNormals(); // only if necessary
}

graph3D.prototype.redraw = function(test) {
    if (test()) {
	this.updateMesh();
	this.renderer.render(this.scene, this.camera);
    }
}

function tIGR() {
    var tIGRCanvas = $("#ti_graph_redux")[0];
    var tIGRContext = tIGRCanvas.getContext("2d");
    var s = new scrubbable(
	"#ti_graph_redux", 125, 95, 175, 125, 0.5, "", drawTIGR,
	    {"increment": 0.01,
	     "formatter": function(x) {return x.toFixed(2)},    
	     "min": -9.99, 
	     "max": 9.99});
    function zFn(x, y) {return sigma(1000*(x-s.value))}
    var graph = new graph3D("ti_graph_redux_3d", "Output", "100px", zFn, 50, 2);
    function test() {return (s.changing);}
    drawTIGR();
    function drawTIGR() {
	tIGRContext.clear();
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(tIGRContext, 50, 35+150*j, labels[j]));
	}
	var neuronOut = new neuron(tIGRContext, 150, 110);
	connectLayers(inputLayer, [neuronOut]);
	neuronOut.output();
	s.draw();
	tIGRContext.mathText(
	    "x", 150, 98, {"size": 12, "text-align": "center"});
	graph.redraw(test);
    };

}


function yStep() {
    var yStepCanvas = $("#y_step")[0];
    var yStepContext = yStepCanvas.getContext("2d");
    var s = new scrubbable(
	"#y_step", 125, 95, 175, 125, 0.5, "", drawYStep,
	    {"increment": 0.01,
	     "formatter": function(x) {return x.toFixed(2)},    
	     "min": -9.99, 
	     "max": 9.99});
    function zFn(x, y) {return sigma(1000*(y-s.value))}
    var graph = new graph3D("y_step_3d", "Output", "100px", zFn, 2, 50);
    function test() {return (s.changing);}
    drawYStep();
    function drawYStep() {
	yStepContext.clear();
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(yStepContext, 50, 35+150*j, labels[j]));
	}
	var neuronOut = new neuron(yStepContext, 150, 110);
	connectLayers(inputLayer, [neuronOut]);
	neuronOut.output();
	s.draw();
	yStepContext.mathText(
	    "y", 150, 98, {"size": 12, "text-align": "center"});
	graph.redraw(test);
    };


}


function bump3d() {
    var b3Canvas = $("#bump_3d")[0];
    var b3Context = b3Canvas.getContext("2d");
    var s1 = new scrubbable(
	"#bump_3d", 125, 20, 175, 50, 0.3, "", drawBump3d,
	    {"increment": 0.01,
	     "formatter": function(x) {return x.toFixed(2)},    
	     "min": -9.99, 
	     "max": 9.99});
    var s2 = new scrubbable(
	"#bump_3d", 125, 170, 175, 200, 0.7, "", drawBump3d,
	    {"increment": 0.01,
	     "formatter": function(x) {return x.toFixed(2)},    
	     "min": -9.99, 
	     "max": 9.99});
    var h = new scrubbable(
	"#bump_3d", 200, 20, 290, 50, 0.6, "h = ", drawBump3d,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)},    
	 "min": -9.9, 
	 "max": 9.9});
    function zFn(x, y) {
	return h.value*(sigma(1000*(x-s1.value))-sigma(1000*(x-s2.value)));
    }
    var graph = new graph3D(
	"bump_3d_graph", "Weighted output from hidden layer", "5px", zFn, 50, 2);
    function test() {return (s1.changing || s2.changing || h.changing);}
    drawBump3d();
    function drawBump3d() {
	b3Context.clear();
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(b3Context, 50, 35+150*j, labels[j]));
	}
	var hiddenLayer = [];
	for (var j = 0; j < 2; j++) {
	    hiddenLayer.push(new neuron(b3Context, 150, 35+150*j));
	}
	var neuronOut = new neuron(b3Context, 250, 110);
	connectLayers(inputLayer, hiddenLayer);
	connectLayers(hiddenLayer, [neuronOut]);
	neuronOut.output();
	s1.draw();
	s2.draw();
	h.draw();
	b3Context.mathText(
	    "x", 150, 23, {"size": 12, "text-align": "center"});
	b3Context.mathText(
	    "x", 150, 173, {"size": 12, "text-align": "center"});
	b3Context.mathText(
	    String(h.value.toFixed(1)), 198, 70, {"size": 14});
	b3Context.mathText(
	    String((-h.value).toFixed(1)), 198, 160, {"size": 14});
	graph.redraw(test);
    };

}


function bumpY() {
    var bYCanvas = $("#bump_3d_y")[0];
    var bYContext = bYCanvas.getContext("2d");
    var s1 = new scrubbable(
	"#bump_3d_y", 125, 20, 175, 50, 0.3, "", drawBumpY,
	    {"increment": 0.01,
	     "formatter": function(x) {return x.toFixed(2)},    
	     "min": -9.99, 
	     "max": 9.99});
    var s2 = new scrubbable(
	"#bump_3d_y", 125, 170, 175, 200, 0.7, "", drawBumpY,
	    {"increment": 0.01,
	     "formatter": function(x) {return x.toFixed(2)},    
	     "min": -9.99, 
	     "max": 9.99});
    var h = new scrubbable(
	"#bump_3d_y", 200, 20, 290, 50, 0.6, "h = ", drawBumpY,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)},  
	 "min": -9.9, 
	 "max": 9.9});
    function zFn(x, y) {
	return h.value*(sigma(1000*(y-s1.value))-sigma(1000*(y-s2.value)));
    }
    var graph = new graph3D(
	"bump_3d_y_graph", "Weighted output from hidden layer", "5px", zFn, 2, 50);
    function test() {return (s1.changing || s2.changing || h.changing);}
    drawBumpY();
    function drawBumpY() {
	bYContext.clear();
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(bYContext, 50, 35+150*j, labels[j]));
	}
	var hiddenLayer = [];
	for (var j = 0; j < 2; j++) {
	    hiddenLayer.push(new neuron(bYContext, 150, 35+150*j));
	}
	var neuronOut = new neuron(bYContext, 250, 110);
	connectLayers(inputLayer, hiddenLayer);
	connectLayers(hiddenLayer, [neuronOut]);
	neuronOut.output();
	s1.draw();
	s2.draw();
	h.draw();
	bYContext.mathText(
	    "y", 150, 23, {"size": 12, "text-align": "center"});
	bYContext.mathText(
	    "y", 150, 173, {"size": 12, "text-align": "center"});
	bYContext.mathText(
	    String(h.value.toFixed(1)), 198, 70, {"size": 14});
	bYContext.mathText(
	    String((-h.value).toFixed(1)), 198, 160, {"size": 14});
	graph.redraw(test);
    };
}

function xYBump() {
    var xYBumpCanvas = $("#xy_bump")[0];
    var xYBumpContext = xYBumpCanvas.getContext("2d");
    var h = new scrubbable(
	"#xy_bump", 200, 20, 290, 50, 0.3, "h = ", drawXYBump,
	{"increment": 0.01,
	 "formatter": function(x) {return x.toFixed(2)},    
	 "min": -9.9, 
	 "max": 9.9});
    function zFn(x, y) {
     	return h.value*(sigma(1000*(x-0.4))-sigma(1000*(x-0.6)))
	+ h.value*(sigma(1000*(y-0.3))-sigma(1000*(y-0.7)));
    }
    var graph = new graph3D(
     	"xy_bump_3d", "Weighted output from hidden layer", "5px", zFn, 50, 50);
    function test() {return (h.changing);}
    drawXYBump();
    function drawXYBump() {
	xYBumpContext.clear();
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(xYBumpContext, 50, 60+150*j, labels[j]));
	}
	var hiddenLayer = [];
	hiddenLayer.push(new neuron(xYBumpContext, 150, 35));
	hiddenLayer.push(new neuron(xYBumpContext, 150, 85));
	hiddenLayer.push(new neuron(xYBumpContext, 150, 185));
	hiddenLayer.push(new neuron(xYBumpContext, 150, 235));
	var neuronOut = new neuron(xYBumpContext, 250, 135);
	inputLayer[0].connectTo([hiddenLayer[0], hiddenLayer[1]]);
	inputLayer[1].connectTo([hiddenLayer[2], hiddenLayer[3]]);
	connectLayers(hiddenLayer, [neuronOut]);
	neuronOut.output();
	xYBumpContext.mathText(
	    "0.40", 150, 45, {"size": 26, "text-align": "center"});
	xYBumpContext.mathText(
	    "0.60", 150, 95, {"size": 26, "text-align": "center"});
	xYBumpContext.mathText(
	    "0.30", 150, 195, {"size": 26, "text-align": "center"});
	xYBumpContext.mathText(
	    "0.70", 150, 245, {"size": 26, "text-align": "center"});
	xYBumpContext.mathText(
	    "x", 150, 23, {"size": 12, "text-align": "center"});
	xYBumpContext.mathText(
	    "x", 150, 73, {"size": 12, "text-align": "center"});
	xYBumpContext.mathText(
	    "y", 150, 173, {"size": 12, "text-align": "center"});
	xYBumpContext.mathText(
	    "y", 150, 223, {"size": 12, "text-align": "center"});
	xYBumpContext.mathText(
	    h.args.formatter(h.value), 200, 71, 
	    {"size": 14, "text-align": "center"});
	xYBumpContext.mathText(
	    h.args.formatter(-h.value), 200, 128, 
	    {"size": 14, "text-align": "center"});
	xYBumpContext.mathText(
	    h.args.formatter(h.value), 200, 155, 
	    {"size": 14, "text-align": "center"});
	xYBumpContext.mathText(
	    h.args.formatter(-h.value), 200, 210, 
	    {"size": 14, "text-align": "center"});

	h.draw();
	graph.redraw(test);
    };
}

function tower() {
    function zFn(x, y) {
	return (0.4 <= x && x <= 0.6 && 0.3 <= y && y <= 0.7) ? 0.7 : 0.0;
    }
    var graph = new graph3D(
     	"tower", "Tower function", "65px", zFn, 50, 50);
}

function manyTowers(id) {
    function zFn(x, y) {
	var xBin = Math.floor(x*4.999);
	var yBin = Math.floor(y*4.999);
	return (xBin*xBin+yBin*yBin)/50;
    }
    var graph = new graph3D(
     	id, "Many towers", "65px", zFn, 50, 50);
}

function towerConstruction() {
    var tCCanvas = $("#tower_construction")[0];
    var tCContext = tCCanvas.getContext("2d");
    var h = new scrubbable(
	"#tower_construction", 185, 20, 275, 50, 0.3, "h = ", drawTC,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)},    
	 "min": -999, 
	 "max": 999});
    var b = new scrubbable(
	"#tower_construction", 210, 70, 300, 100, -0.5, "b = ", drawTC,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)},    
	 "min": -999, 
	 "max": 999});
    function zFn(x, y) {
     	return sigma(b.value+h.value*(sigma(1000*(x-0.4))-sigma(1000*(x-0.6)))
	+ h.value*(sigma(1000*(y-0.3))-sigma(1000*(y-0.7))));
    }
    var graph = new graph3D(
     	"tower_construction_3d", "Output", "100px", zFn, 50, 50);
    function test() {return (h.changing || b.changing);}
    drawTC();
    function drawTC() {
	tCContext.clear();
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(tCContext, 50, 60+150*j, labels[j]));
	}
	var hiddenLayer = [];
	hiddenLayer.push(new neuron(tCContext, 150, 35));
	hiddenLayer.push(new neuron(tCContext, 150, 85));
	hiddenLayer.push(new neuron(tCContext, 150, 185));
	hiddenLayer.push(new neuron(tCContext, 150, 235));
	var neuronOut = new neuron(tCContext, 250, 135);
	connectLayers([inputLayer[0]], [hiddenLayer[0], hiddenLayer[1]]);
	connectLayers([inputLayer[1]], [hiddenLayer[2], hiddenLayer[3]]);
	connectLayers(hiddenLayer, [neuronOut]);
	neuronOut.output();
	tCContext.mathText(
	    "0.40", 150, 45, {"size": 26, "text-align": "center"});
	tCContext.mathText(
	    "0.60", 150, 95, {"size": 26, "text-align": "center"});
	tCContext.mathText(
	    "0.30", 150, 195, {"size": 26, "text-align": "center"});
	tCContext.mathText(
	    "0.70", 150, 245, {"size": 26, "text-align": "center"});
	// tCContext.mathText(
	//     "x", 150, 23, {"size": 12, "text-align": "center"});
	// tCContext.mathText(
	//     "x", 150, 73, {"size": 12, "text-align": "center"});
	// tCContext.mathText(
	//     "y", 150, 173, {"size": 12, "text-align": "center"});
	// tCContext.mathText(
	//     "y", 150, 223, {"size": 12, "text-align": "center"});
	tCContext.mathText(
	    h.args.formatter(h.value), 200, 71, 
	    {"size": 14, "text-align": "center"});
	tCContext.mathText(
	    h.args.formatter(-h.value), 200, 128, 
	    {"size": 14, "text-align": "center"});
	tCContext.mathText(
	    h.args.formatter(h.value), 200, 155, 
	    {"size": 14, "text-align": "center"});
	tCContext.mathText(
	    h.args.formatter(-h.value), 200, 210, 
	    {"size": 14, "text-align": "center"});
	h.draw();
	b.draw();
	graph.redraw(test);
    };
}


function theTwoTowers() {
    var tTTCanvas = $("#the_two_towers")[0];
    var tTTContext = tTTCanvas.getContext("2d");
    var w1 = new scrubbable(
	"#the_two_towers", 230, 195, 320, 225, 0.7, "w = ", drawTTT,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)},    
	 "min": -999, 
	 "max": 999});
    var w2 = new scrubbable(
	"#the_two_towers", 230, 345, 320, 375, 0.5, "w = ", drawTTT,
	{"increment": 0.1,
	 "formatter": function(x) {return x.toFixed(1)},    
	 "min": -999, 
	 "max": 999});
    var x1 = 0.1, x2 = 0.2, y1 = 0.8, y2 = 0.9;
    var x3 = 0.7, x4 = 0.8, y3 = 0.2, y4 = 0.3;
    var params = [x1, x2, y1, y2, x3, x4, y3, y4];
    var heights = [40, 90, 190, 240, 340, 390, 490, 540];
    function zFn(x, y) {
     	return w1.value*((x1 <= x && x <= x2 && y1 <= y && y <= y2) ? 1: 0)
	+w2.value*((x3 <= x && x <= x4 && y3 <= y && y <= y4) ? 1:0);
    };
    var graph = new graph3D(
     	"the_two_towers_3d", "Weighted output", "65px", zFn, 50, 50);
    function test() {return (w1.changing || w2.changing);}
    drawTTT();
    function drawTTT() {
	tTTContext.clear();
	tTTContext.filledRoundedRectangle(
	    70, 5, 230, 265, 5, "#555555", "#dddddd");
	tTTContext.filledRoundedRectangle(
	    70, 305, 230, 565, 5, "#555555", "#dddddd");
	var inputLayer = [];
	var labels = ["x", "y"];
	for (var j = 0; j < 2; j++) {
	    inputLayer.push(new neuron(tTTContext, 30, 235+100*j, labels[j]));
	}
	var hiddenLayer1 = [];
	hiddenLayer1.push(new neuron(tTTContext, 110, 35));
	hiddenLayer1.push(new neuron(tTTContext, 110, 85));
	hiddenLayer1.push(new neuron(tTTContext, 110, 185));
	hiddenLayer1.push(new neuron(tTTContext, 110, 235));
	hiddenLayer1.push(new neuron(tTTContext, 110, 335));
	hiddenLayer1.push(new neuron(tTTContext, 110, 385));
	hiddenLayer1.push(new neuron(tTTContext, 110, 485));
	hiddenLayer1.push(new neuron(tTTContext, 110, 535));
	connectLayers([inputLayer[0]], 
		      [hiddenLayer1[0], hiddenLayer1[1], 
		       hiddenLayer1[4], hiddenLayer1[5]]);
	connectLayers([inputLayer[1]], 
		      [hiddenLayer1[2], hiddenLayer1[3],
		       hiddenLayer1[6], hiddenLayer1[7]]);
	// Redraw, to avoid overlapping lines
	hiddenLayer1.forEach(function(n) {
	    n.draw()
	});
	var hiddenLayer2 = [];
	hiddenLayer2.push(new neuron(tTTContext, 190, 135));
	hiddenLayer2.push(new neuron(tTTContext, 190, 435));
	connectLayers([hiddenLayer1[0], hiddenLayer1[1],
		       hiddenLayer1[2], hiddenLayer1[3]], hiddenLayer2[0]);
	connectLayers([hiddenLayer1[4], hiddenLayer1[5],
		       hiddenLayer1[6], hiddenLayer1[7]], hiddenLayer2[1]);
	var neuronOut = new neuron(tTTContext, 270, 285);
	connectLayers(hiddenLayer2, [neuronOut]);
	neuronOut.output();
	for (var  j = 0; j < 8; j++) {
	    tTTContext.mathText(String(params[j]), 110, heights[j],
			       {"text-align": "center"});
	}
	w1.draw();
	w2.draw();
	graph.redraw(test);
    };
}

function towerND() {
    var tNDCanvas = $("#tower_n_dim")[0];
    var tNDContext = tNDCanvas.getContext("2d");
    var inputLayer = [];
    var hiddenLayer = [];
    var labels = ["x_1", "x_2", "x_3"];
    for (var j = 0; j < 3; j++) {
	inputLayer.push(new neuron(tNDContext, 50, 52+150*j, labels[j]));
	hiddenLayer.push(new neuron(tNDContext, 150, 27+150*j));
	hiddenLayer.push(new neuron(tNDContext, 150, 77+150*j));
    }
    var neuronOut = new neuron(tNDContext, 250, 202);
    inputLayer[0].connectTo([hiddenLayer[0], hiddenLayer[1]]);
    inputLayer[1].connectTo([hiddenLayer[2], hiddenLayer[3]]);
    inputLayer[2].connectTo([hiddenLayer[4], hiddenLayer[5]]);
    connectLayers(hiddenLayer, [neuronOut]);
    neuronOut.output();
    // redraw to avoid arrows overdrawing the neurons
    hiddenLayer.forEach(function(n) {n.draw()}); 
    for (var j = 1; j <= 3; j++) {
	tNDContext.mathText(
	    "s_"+j, 150, 35+150*(j-1), {"size": 26, "text-align": "center"});
	tNDContext.mathText(
	    "t_"+j, 150, 85+150*(j-1), {"size": 26, "text-align": "center"});
    }
}

function sigmoidLike(id, title, fn) {
    var sigmoidLikeCanvas = $(id)[0];
    var sigmoidLikeContext = sigmoidLikeCanvas.getContext("2d");
    var xScale = scale(-3, 3, 20.5, 480.5);
    var yScale = scale(0, 1, 180.5, 20.5);
    var xRange = range(-3, 3, 0.01);
    sigmoidLikeContext.arrow(xScale(-3), yScale(0), xScale(3), yScale(0));
    sigmoidLikeContext.arrow(xScale(0), yScale(0), xScale(0), yScale(1.02));
    sigmoidLikeContext.mathText(
	title, 250, 10, {"text-align": "center", "size": 16});
    sigmoidLikeContext.mathText("z", xScale(3.08), yScale(-0.02),
			       {"size": 16});
    var data = xRange.map(function(x) {return {"x": x, "y": fn(x)} });
    sigmoidLikeContext.plot(data, xScale, yScale, graphColor);
}

function ramping() {
    var rampingCanvas = $("#ramping")[0];
    var rampingContext = rampingCanvas.getContext("2d");
    var w = new scrubbable(
	"#ramping", 130, 60, 220, 90, 6, "w = ", drawRamping, 
	    {"min": -999, "max": 999});
    var b = new scrubbable(
	"#ramping", 205, 40, 295, 70, -3, "b = ", drawRamping, 
	    {"min": -999, "max": 999});
    drawRamping();
    function drawRamping() {
	rampingContext.clear();
	inputNeuron = new neuron(rampingContext, 100, 100, "x");
	outputNeuron = new neuron(rampingContext, 250, 100);
	connectLayers([inputNeuron], [outputNeuron]);
	outputNeuron.output();
	drawGraphAxes(rampingContext, "Output from neuron");
	plotGraph(rampingContext, function(x) {
	    return sLike(w.value*x+b.value)});
	w.draw();
	b.draw();
    }    
}

function failure() {
    var failureCanvas = $("#failure")[0];
    var failureContext = failureCanvas.getContext("2d");
    // TODO: Based on drawGraphAxes and plotGraph.  Make DRY.
    var title = "Output from neuron";
    var xLabel = "x";
    var yTicks = [1];
    var yMax = 1;
    var yMin = 0;
    var xScale = scale(0, 1, 20.5, 180.5);
    var yScale = scale(0, 1, 170.5, 14.5);
    // window of failure
    failureContext.filledRectangle(
	xScale(0.45), yScale(0), xScale(0.55), yScale(1),
	"#cceecc", "#cceecc", 0);
    failureContext.text(title, 100, 11, 
		   {"font": "14px Arial", "text-align": "center"});
    failureContext.arrow(xScale(0), yScale(0), xScale(1.1), yScale(0)); // x axis
    failureContext.arrow(xScale(0), yScale(0), xScale(0), yScale(1.1)); // y axis
    failureContext.text("0", 13, 177, {"font": littleFont});
    yTicks.forEach(function(y) {
	failureContext.line(17.5, yScale(y), xScale(0), yScale(y));
	failureContext.text(y, 6.5, yScale(y)+2, {"font": littleFont});
    });
    failureContext.line(xScale(1), 173.5, xScale(1), yScale(0));
    failureContext.text("1", xScale(1)-4, 184, {"font": littleFont});
    failureContext.mathText("x", xScale(1.1)+8, yScale(0)+3, {"size": 14});
    // plot function
    var xs = range(0, 1, 0.01);
    var data = xs.map(function(x) {return {"x": x, "y": sigma(50*x-25)} });
    failureContext.plot(data, xScale, yScale, graphColor);
}

function seriesOfBumps(id, shift, heights) {
    // TODO: Based on invertedFunction.  Refactor to be DRY.
    var sOBCanvas = $(id)[0];
    var sOBContext = sOBCanvas.getContext("2d");
    var xScale = scale(0, 1, 20.5, 280.5);
    var yScale = scale(-2, 2, 280.5, 20.5);
    // x axis is done later
    sOBContext.arrow(xScale(0), yScale(-3), xScale(0), 
				  yScale(2.15), defaultLine);
    sOBContext.line(xScale(1), yScale(0), xScale(1), 
				 yScale(-0.05), defaultLine);
    sOBContext.mathText("x", xScale(1.05)+8, yScale(0)+3,
				    {"size": 14});
    sOBContext.text("1", xScale(1.0)-3, yScale(0)+14,
				    {"font": "11px Arial"});
    for (var j = -2; j <= 2; j++) {
	if (j !== 0) {
	    sOBContext.line(
		xScale(-0.01), yScale(j), xScale(0), yScale(j));
	}
	sOBContext.text(j, xScale(-0.05+0.01*j.sign()), 
				     yScale(j-0.04), {"font": "11px Arial"});
    }
    function bumpFactory(start, height) {
	var end = start+0.2;
	return function(x) {
	    return height*(sigma(300*(x-start))-sigma(300*(x-end)));
	};
    }
    var xRange = range(0, 1, 0.01);
    var starts = [0.0+shift, 0.2+shift, 0.4+shift, 0.6+shift, 0.8+shift];
    var colors = ["red", "green", "blue", "magenta", "orange"];
    var bumpFn, data;
    for (var j=0; j < 5; j++) {
	bumpFn = bumpFactory(starts[j], heights[j]);
	data = xRange.map(function(x) {return {"x": x, "y": bumpFn(x)}; });
	sOBContext.plot(data, xScale, yScale, colors[j]);
    }
    sOBContext.arrow(xScale(0), yScale(0), xScale(1.05), 
				  yScale(0), defaultLine);

}


function drawBasicNN(context) {
    var neuronIn = new neuron(context, 30, 170, "x");
    var neuronOut = new neuron(context, 270, 170);
    var hiddenLayer = [];
    for (var j = 0; j < 2; j++) {
	hiddenLayer.push(new neuron(context, 150, 95+150*j));
    }
    connectLayers([neuronIn], hiddenLayer);
    connectLayers(hiddenLayer, [neuronOut]);
    neuronOut.output();
}

function drawGraphAxes(context, title, xLabel, yTicks, yMin) {
    var xLabel = selfOrDefault(xLabel, "true");
    var yTicks = selfOrDefault(yTicks, [1]);
    var yMax = yTicks[yTicks.length-1];
    var yMin = selfOrDefault(yMin, 0);
    var xScale = scale(0, 1, 360.5, 544.5);
    var yScale = scale(0, yMax, 170.5, 14.5);
    // context.line(340.5, 0, 340.5, context.canvas.height, "#ccc", 1);
    context.text(title, 460, 10, 
		   {"font": littleFont, "text-align": "center"});
    context.arrow(xScale(0), yScale(0), 560.5, 170.5, defaultLine, 1); // x axis
    context.arrow(xScale(0), yScale(yMin), 360.5, 0.5, defaultLine, 1); // y axis
    context.text("0", 353, 177, {"font": littleFont});
    yTicks.forEach(function(y) {
	context.line(357.5, yScale(y), 360.5, yScale(y), defaultLine, 1);
	context.text(y, 346.5, yScale(y)+2, {"font": littleFont});
    });
    context.line(544.5, 173.5, 544.5, 170.5, defaultLine, 1);
    context.text("1", 541, 184, {"font": littleFont});
    if (xLabel) {
	context.mathText("x", 440, 190, 
		   {"text-align": "center"});
    }
}

function plotGraph(context, f, yMax) {    
    var yMax = selfOrDefault(yMax, 1);
    var xScale = scale(0, 1, 360.5, 544.5);
    var yScale = scale(0, yMax, 170.5, 14.5);
    var xs = range(0, 1, 0.01);
    var data = xs.map(function(x) {return {"x": x, "y": f(x)} });
    context.plot(data, xScale, yScale, graphColor);
}

function plotSteps(context, values, yMax) {
    var yMax = selfOrDefault(yMax, 1);
    var xScale = scale(0, 1, 360.5, 544.5);
    var yScale = scale(0, yMax, 170.5, 14.5);
    // Sort so the values are in order of increasing s
    values.sort(function(x, y) {return (x.s - y.s)});
    // graph is an assoc. array who elements are the x and y co-ords
    // of the step positions.
    var graph = [];
    var sum = 0;
    var yIncoming = 0;
    for (var j = 0; j < values.length; j++) {
	sum += values[j].w;
	if (values[j].s < 0) {
	    yIncoming += values[j].w;
	}
	if (0 <= values[j].s && values[j].s <= 1) {
	    graph.push({"x": values[j].s, "y": sum});
	}
    }
    graph.unshift({"x": 0, "y": yIncoming});
    var n = graph.length-1;
    // final horizontal line
    context.line(xScale(graph[n].x), yScale(graph[n].y), 
		 xScale(1.0), yScale(graph[n].y), 
		 graphColor);
    for (var j = 0; j < n; j++) {
	context.line(xScale(graph[j].x), yScale(graph[j].y), 
		     xScale(graph[j+1].x), yScale(graph[j].y), 
		     graphColor);
	context.line(xScale(graph[j+1].x), yScale(graph[j].y), 
		     xScale(graph[j+1].x), yScale(graph[j+1].y), 
		     graphColor);
    }
}

// Miscellaneous functions

function isAlpha(s) {
    // Checks whether the string s contains alphabetical characters only
    return /^[a-zA-Z]+$/.test(s);
}

function selfOrDefault(x, deflt) {
    // Return x if x is not undefined, otherwise return the default
    return (typeof x !== "undefined") ? x : deflt;
}

function parseArgs(args, deflt) {
    // For each key in the associative array deflt, set args to that key,
    // if the key isn't in args.  Then return args.
    args = selfOrDefault(args, {});
    for (var index in deflt) {
	args[index] = selfOrDefault(args[index], deflt[index]);
    }
    return args;
}

function mousePosition(e, canvas) {
    // Return an associative array whose elements are the x and y
    // co-ordinates with respect to canvas
    return {"x": e.pageX-canvas.offsetLeft, "y": e.pageY-canvas.offsetTop};
};

function range(start, end, step) {
    var l = [];
    for (var x = start; x <= end; x += step) {l.push(x);}
    return l;
}

Number.prototype.limit = function(a, b) {
    // Assumes a < b.  Returns the number if it's within the range a
    // to b, otherwise returns the smaller or larger endpoint, as
    // appropriate.  Idea from Mootools.
    if (this.valueOf() < a) {return a}
    if (this.valueOf() > b) {return b}
    return this.valueOf();
}

Number.prototype.sign = function() {
    return this >= 0 ? 1 : -1;
}

function sigma(z) {return  1.0/(1.0+Math.exp(-z));}

function sLike(z) {
    return sigma(z)+0.2*Math.sin(10*z)*Math.exp(-Math.abs(z));
};
