function button(id, x1, y1, x2, y2, message, redraw, action) {
    // Create a button in canvas id, at position x1, y1, x2, y2,
    // containing message, and use the closure redraw to redraw the
    // canvas.  
    this.id = id;
    this.canvas = $(id)[0];
    this.context = this.canvas.getContext("2d");
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.message = message;
    this.redraw = redraw;
    this.mousedown = false; // true while over the button, and not yet released
    this.color = "#ddd";
    $(this.id).mousemove(function(e) {
	var mP = mousePosition(e, $(this.id)[0]);
	if (!this.mousedown) {
	    if (mP.x >= this.x1 && mP.x <= this.x2 && 
		mP.y >= this.y1 && mP.y <= this.y2) {
		if (this.color !== "#ccc") {
		    this.color = "#ccc";
		    this.redraw();
		}
	    } else {
		if (this.color !== "#ddd") {
		    this.color = "#ddd";
		    this.redraw();
		}
	    };
	}
    }.bind(this));
    $(this.id).mousedown(function(e) {
	var mP = mousePosition(e, $(this.id)[0]);
	if (mP.x >= this.x1 && mP.x <= this.x2 && mP.y >= this.y1 && mP.y <= this.y2) {
	    this.mousedown = true;
	    this.color = "#bbb";
	    action();
	    this.redraw();
	}
    }.bind(this));
    $("html").mouseup(function(e) {
	var mP = mousePosition(e, $(this.id)[0]);
	if (this.mousedown) {
	    this.mousedown = false;
	    if (mP.x >= this.x1 && mP.x <= this.x2 && mP.y >= this.y1 && mP.y <= this.y2) {
		this.color = "#ccc";
	    } else {
		this.color = "#ddd";
	    }
	    this.redraw();
	}
    }.bind(this));
    this.draw();
}

button.prototype.draw = function() {
    this.context.filledRoundedRectangle(
	this.x1, this.y1, this.x2, this.y2,
	10, "#555", this.color, 1)
    this.context.text(
	this.message,
	(this.x1+this.x2)/2, (this.y1+this.y2)/2+5,
	{"text-align": "center"});
}




