/* include directives */
function loadJs(uri) {
    var s = document.createElement("script");
    s.src = uri;
    document.head.appendChild(s);
}
loadJs("shaderdb.js");
loadJs("renderer.js");
loadJs("worker.js");
loadJs("utils.js");

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



    var width = document.getElementById(id).width;
    var height = document.getElementById(id).height;
    var this_app = this;
    var renderer = new Renderer(gl);



    return {
      	"start": function()
      	{
            renderer.viewport(0, 0, this_app.width, this_app.height);
            renderer.clear();

            //renderer.depthTest(true);
      	    renderer.draw();
	      },
    };
};


window.onload = function(e)
{
    var a = new App("screen");
    a.start("screen");

//    var w= new Worker(null, null);
//    w.start();
}
