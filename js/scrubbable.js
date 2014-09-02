function scrubbable(id, x1, y1, x2, y2, initialValue, message, redraw,
		   args) {
    // Create a scrubbable number in canvas id, at position x1, y1,
    // x2, y2, with initialValue, text "message = this.value", and use
    // the closure redraw to redraw the canvas.  args is an optional
    // associative array, with possible keys increment (for the size
    // of the increments in the variable), and formatter, which is a
    // function which formats the value for printing to the canvas.
    this.id = id;
    this.canvas = $(id)[0];
    this.context = this.canvas.getContext("2d");
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.value = initialValue;
    this.message = message;
    this.over = false; // flag to indicate whether we're over this scrubbable number
    this.scrubbing = false; // flag to indicate whether we're currently scrubbing
    this.change = false; // flag to indicate whether the value has recently changed
    this.redraw = redraw;
    this.args = parseArgs(
	args, {"increment": 1,
	       "formatter": function(x) {return String(x)},
	       "min": -999,
	       "max": 999});
    $(this.id).mousedown(function(e) {
	var mP = mousePosition(e, $(this.id)[0]);
	if (mP.x >= this.x1 && mP.x <= this.x2 && mP.y >= this.y1 && mP.y <= this.y2) {
	    this.scrubbing = true;
	    this.scrubbingStartPosition = mP.x;
	    this.start = this.value;
	    this.redraw();
	}
    }.bind(this));
    $("html").mousemove(function(e) {
	var mP = mousePosition(e, $(this.id)[0]);
	if (mP.x >= this.x1 && mP.x <= this.x2 && mP.y >= this.y1 && mP.y <= this.y2) {
	    if (!this.over) {
		this.over = true;
		this.redraw();
	    }
	} else {
	    if (this.over) {
		this.over = false;
		this.redraw();
	    }
	}
	if (this.scrubbing) {
	    var oldValue = this.value;
	    var dScrubbing = mousePosition(
		e, $(this.id)[0]).x - this.scrubbingStartPosition;
	    this.value = (this.start+Math.round(dScrubbing/3)*this.args.increment)
		.limit(this.args.min, this.args.max);
	    // Has the value recently changed?
	    this.changing = (oldValue !== this.value); 
	    this.redraw();
	}
    }.bind(this));
    $("html").mouseup(function(e) {
	this.scrubbing = false;
	this.changing = false;
	this.redraw();
    }.bind(this));
}

scrubbable.prototype.draw = function() {
    if (this.over && !this.scrubbing) {
	this.context.filledRoundedRectangle(
	    this.x1, this.y1, this.x2, this.y2, 5, "white", "#ddd", 0);
    }
    if (this.scrubbing) {
	this.context.filledRoundedRectangle(
	    this.x1, this.y1, this.x2, this.y2, 5, "white", "#ccc", 0);
    }
    this.context.mathText(this.message+this.args.formatter(this.value), 
		      (this.x1+this.x2)/2, this.y1+22, 
		      {"size": 24,
		       "littleSize": 18,
		       "color": scrubbableColor,
		       "text-align": "center",
		       "textBaseline": "top",
		       "down": 8});
}
