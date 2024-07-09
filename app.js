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
    var deg = 0;
    var i = 0;
    var x_rot = glm.rotate('x', 10)(); 
    var scaler = glm.scale(0.3, 0.3, 0.5);
    return {
        "instance" : function() { return this; } ,
        "start" : function()  {
            var y_rot = null;
//            if (i % 2 === 0 ) {
       //         rot = glm.rotate('y', deg++ % 180)();
//            } else if (i % 3 === 0) {
                y_rot = glm.rotate('y', Date.now())(); //deg++ % 360)();
//            } else {
//              rot = glm.rotate('z', deg++ % 180)();
 //           }
  //          i++;
//            console.log("I " + i);
//            render.draw(0, points.length/3);
 //           console.log("app start");
            reels.prep();
//            var scale = glm.scale(-0.1,  -0.1 , 0.5);
            //var  = reels.proj(i++, canvas.width/canvas.height, 1, 100);
            var xrot = reels.xrot();
            var yrot = reels.yrot();
            var s = reels.scale();
            render.uniform4v(xrot, false , x_rot);
            render.uniform4v(yrot, false, y_rot);
            render.uniform4v(s, false, scaler);
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
                        120);   
                        
    startbutton.onclick = function(ev) 
    { 
        renderLoop.start();
    }

    stopbutton.onclick = function(ev) {
        renderLoop.stop();
    }
  
}