/* include directives */
function loadJs(uri) {
    var s = document.createElement("script");
    s.src = uri;
    document.head.appendChild(s);
}

loadJs("defines.js");
loadJs("utils.js");
loadJs("worker.js");
loadJs("framework.js");
loadJs("shaderdb.js");
loadJs("renderer.js");

function webglversion(ctx)
{
    var gl2 = null;
    try {
        gl2 = ctx.getContext("webgl2");
    } catch (nowebgl2) {
        console.log("NO webgl2 extensions...");
        try {
            gl2 = ctx.getContext("webgl");
        } catch (nowebgl) {
            console.log("No webgl in browser");
            throw Error("NO WEBGL SUPPORT");
        }
    }
    console.log("Webgl Support API: (" + gl2 + ")");
    return true;
}


var App = function(id)
{
    var gl = null;
    var canvas = null;

    (function() {
              canvas = document.getElementById(id);
              webglversion(canvas); 
                try {
                    gl = canvas.getContext("webgl2");
                } catch (e) {
                    throw new Error("No WebGL support");
                }
     })();

    var width = canvas.width;
    var height = canvas.height;
    var renderer = new Renderer(gl);
    var framework = new IZFramework();  // do the logic here 

    console.log("Canvas dimensions : Width: ("+width+")\t Height: ("+height+")");
    
    if (DEPTH_TEST_ENABLED) {
        renderer.depthTest(true);
    }

    var drawScene = function() {
        renderer.viewport(0, 0, width, height);
        renderer.clear(1.0, 0.0, 0.0, 1.0);            
        renderer.draw();
    }

    var updateInputs = function() {
        /* collect inputs from keyboard */
    }

    var updateFramework = function() {
        framework.update(); 
    }

    return {
      	"start": function()
      	{
              updateInputs(); 
              updateFramework();
              drawScene(); 
        },
    };
};

window.onload = function(e)
{
    var startbutton = document.getElementById('startbutton');
    var stopbutton = document.getElementById('stopbutton');
    

    var a = new App("screen");
   // a.start(); 
    
    var renderLoop = new Worker(a, 
                        function(app) 
                            { app.start();}, 
                        30);    
    startbutton.onclick = function(ev) { renderLoop.start(); }
    stopbutton.onclick =  function(ev) { renderLoop.stop(); }
  
}
