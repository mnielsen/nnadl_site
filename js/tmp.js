// This is all temporary stuff, ultimately to be superseded

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
