//cookies functions
var days = 365*5

function setCookie(cId, cVal) {
	var time = new Date();
	time.setDate(time.getDate() + days);
	document.cookie = cId+'='+cVal+';expires='+time.toGMTString()+';path=/';
}

function getCookie(cId) {
    var nameEQ = cId + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}