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
