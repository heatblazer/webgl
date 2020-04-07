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
loadJs("points.js") // generated file!!!
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
     //decide to work w/o normals if not normalized 
    var  normals = points; //normalize(points);
    
    var vertices = render.vbo(normals);
    var shader_program = render.linkProgram(shaders["vertex3"], shaders["color2"]);
    render.bindBuffer(vertices);
    var coordinates = render.attribLoc(shader_program, "coordinates");
    var offset = render.uniformLoc(shader_program, "uOffset");    
    render.gl().uniform4fv(offset, [0.0, 0.0, 0.0, 0.0]);
    render.attribPtr(coordinates);
    return {
        "instance" : function() { return this; } ,
        "start" : function()  {
            render.draw(0, points.length/3);
        },
        "move" : function(x,y,z) { 
            render.gl().uniform4fv(offset, [x, y, z, 0]); 
        }
    };
}


window.onload = function(e)
{
    var startbutton = document.getElementById('startbutton');
    var stopbutton = document.getElementById('stopbutton');
    
    var a = new App("screen");
    a.start();
    /* TODO: wait */
    var renderLoop = new Worker(a, 
                        function(app) 
                        { 
                            if (true) {
                            var time = Date.now();
                            var x = Math.sin(time);
                            var y = Math.cos(time);

                            a.move(x, y, 0);
                            a.start();
                            }
                        }, 
                        60);   
                        
    startbutton.onclick = function(ev) 
    { 
        renderLoop.start();
    }

    stopbutton.onclick = function(ev) {
        renderLoop.stop();
    }
  
}