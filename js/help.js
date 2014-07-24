//help
$(document).ready(function() {
	$("p").hide();

	$("h5").click(function() {
		$("p").slideToggle(300);
	});

});
//fullscreen function
function fullScreen() {
    if (BigScreen.enabled) {
        BigScreen.request(canvas, onEnter, onExit, onError); //var canvas is form js/script.js
        // You could also use .toggle(element, onEnter, onExit, onError)
    }
    else {
        // fallback for browsers that don't support full screen
		say("Your browser don`t support full screen. Maybe you can try it in another browser or play normal size.");
    }
}
onEnter = function() {
    // called when the first element enters full screen
}
onError = function() {
    // called when there is an error
	say("There is an ERROR with entering Fullscreen mode. Maybe you can try it in another browser or play normal size.");
}
onExit = function() {
    // called when all elements have exited full screen
}
function say(str) {
	alert("Oeps, "+str+"	;(");
}

