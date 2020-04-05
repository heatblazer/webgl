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
loadJs("point.js") // generated file!!!
loadJs("renderer.js");


var App = function(id)
{
    var gl = null;
    var canvas = null;
    var self = this;
    (function() {
              canvas = document.getElementById(id);
                
     })();

    var width = canvas.width;
    var height = canvas.height;
    render = new Renderer(width, height, canvas);
    render.init();
    
    // load data and normalize it
    var normals = normalize(points);
    var vertices = render.vbo(normals);
    var shader_program = render.linkProgram(shaders["vertex2"], shaders["color2"]);
    render.bindBuffer(vertices);
    var coordinates = render.location(shader_program, "coordinates");
    render.attribPtr(coordinates);

    return {
        "start" : function() 
        {
            render.draw();
        },
    };
}


window.onload = function(e)
{
    var startbutton = document.getElementById('startbutton');
    var stopbutton = document.getElementById('stopbutton');
    
    var a = new App("screen");
   // a.start(); 
    
    /* TODO: wait
    var renderLoop = new Worker(a, 
                        function(app) 
                            { app.start();}, 
                        30);   
                        */ 
    startbutton.onclick = function(ev) { a.start(); }
  
}