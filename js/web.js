//help
$(document).ready(function() {
	$("p").hide();

	$("h5").click(function() {
		$("p").slideToggle(300);
	});

});
//fullscreen function

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

function fullScreen() {
    if (BigScreen.enabled && !is_chrome) {
        BigScreen.request(document.getElementById("mainCanvas"), onEnter, onExit, onError); //var canvas is form js/script.js
        // You could also use .toggle(element, onEnter, onExit, onError)
    }
    else {
        // fallback for browsers that don't support full screen
		say("Your browser don`t support full screen.");
		window.location.assign("fullscreen.htm");
    }
}
onEnter = function() {
    // called when the first element enters full screen
}
onError = function() {
    // called when there is an error
	say("There is an ERROR with entering Fullscreen mode.");
	window.location.assign("fullscreen.htm");
}
onExit = function() {
    // called when all elements have exited full screen
}
function say(str) {
	alert("Oeps, "+str+" Your going to a Fullscreen Page.");
}

