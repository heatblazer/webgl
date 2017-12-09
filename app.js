/* include directives */
function loadJs(uri) {
    var s = document.createElement("script");
    s.src = uri;
    document.head.appendChild(s);
} 

loadJs("renderer.js");


var App = function(id)
{
    var gl = null;
    var canvas = null;
    
    (function() {
	var canvas = document.getElementById(id);
	    try {
		gl = canvas.getContext("experimental-webgl");
	    } catch (e) {
		throw new Error("No WebGL support");
	    }
    })();
    
    
    var renderer = new Renderer(gl);

    return {
	"start": function() 
	{  
	    console.log("started app");
	    renderer.clear();
	    renderer.draw();
	},
    };
};


window.onload = function(e)
{
    var a = new App("screen");
    a.start("screen");
}
