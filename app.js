/* include directives */


function loadJs(uri) {
    var s = document.createElement("script");
    s.src = uri;
    document.head.appendChild(s);
}

loadJs("miniglm.js");
loadJs("points.js") // generated file!!!
loadJs("defines.js");
loadJs("worker.js");
loadJs("framework.js");
loadJs("shaderdb.js");
loadJs("meshdb.js")
loadJs("renderer.js");
loadJs("reelanim.js");




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
    var reels = new Reels(render);    
    var vertices = reels.vertices();
    var glm = new MiniGLM();
    console.log(glm.identity());
    console.log(glm.rotate('x', 40)());
    return {
        "instance" : function() { return this; } ,
        "start" : function()  {
            var i = 0;
//            render.draw(0, points.length/3);
            console.log("app start");
            reels.prep();
            var proj_mat_data = reels.proj(i++, canvas.width/canvas.height, 1, 100);
            var projmatloc = reels.pmat();
            render.uniform4v(projmatloc, false , proj_mat_data);
            reels.draw();
        },
        "move" : function(x,y,z) { 
//            render.gl().uniform4fv(offset, [x, y, z, 0]); 
        },
        "rotate" : function(theta) {            
        }
    };
}


window.onload = function(e)
{
    var startbutton = document.getElementById('startbutton');
    var stopbutton = document.getElementById('stopbutton');
    
    var a = new App("screen");
//    a.start();
    /* TODO: wait */
    var x = 0.1;
    var y = 0.1;
    var tf = false;
    var renderLoop = new Worker(a, 
                        function(app) 
                        { 
  //                          tf ^= true;
  //                          if (true) {
 //                           var time = Date.now();
 //                           if (x >= 1.0) x *= -1;
 //                           x += 0.01;//Math.sin(time);
//                            a.move(x,  -x, 0);
                            a.start();
 //                           }
                        }, 
                        30);   
                        
    startbutton.onclick = function(ev) 
    { 
        renderLoop.start();
    }

    stopbutton.onclick = function(ev) {
        renderLoop.stop();
    }
  
}