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
      	    canvas = document.getElementById(id);
      	    try {
      		      gl = canvas.getContext("experimental-webgl");
      	    } catch (e) {
      		      throw new Error("No WebGL support");
	         }
     })();


    var width = canvas.width;
    var height = canvas.height;
    var this_app = this;
    var renderer = new Renderer(gl);
    console.log("Width: ("+width+")\t Height: ("+height+")");

    return {
      	"start": function()
      	{
            renderer.viewport(0, 0, this_app.width, this_app.height);
            renderer.clear(0.0, 1.0, 0.0, 1.0);            
            //renderer.depthTest(true);
            renderer.draw();
          },
    };
};


window.onload = function(e)
{
    var a = new App("screen");
    var renderLoop = new Worker(a, 
                        function(app) 
                            { app.start();}, 
                        100);    
    renderLoop.start();
    renderLoop.stop();
}
