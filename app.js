/* include directives */

var GL = null;

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


function setCanvasSize(width, height) {
    GL.viewport(0, 0, width, height);
}

function initGL(width, height) {
	setCanvasSize();
	console.log(width, height);
	GL.viewport(0, 0, width, height);
    GL.clearColor(1, 0, 0, 1);
    GL.clear(GL.COLOR_BUFFER_BIT);
}

var App = function(id)
{
    var gl = null;
    var canvas = null;
    var self = this;
    (function() {
              canvas = document.getElementById(id);
                try {
                    GL = canvas.getContext("webgl2");
                    console.log("#####Got webgl ctx...")
                } catch (e) {
                    throw new Error("No WebGL support");
                }
     })();

    var width = canvas.width;
    var height = canvas.height;


    return {
        "start" : function() 
        { 
            initGL(width, height); 
        },
    };
}




window.onload = function(e)
{
    var startbutton = document.getElementById('startbutton');
    var stopbutton = document.getElementById('stopbutton');
    
    var a = new App("screen");
   // a.start(); 
    
    /*
    var renderLoop = new Worker(a, 
                        function(app) 
                            { app.start();}, 
                        30);   
                        */ 
    startbutton.onclick = function(ev) { a.start(); }
  
}