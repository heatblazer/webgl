//reel anim


//var color = gl.getAttribLocation(shaderProgram, "color");
//         gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

var Reels = function(pReder)
{
    var vertices = pReder.vbo(meshdb.example001);
  //  var colors = pReder.vbo(colmap);
    
  
    var shader_program = pReder.linkProgram(shaders["vertex2"], shaders["color2"]);
    var pmatrix = render.uniformLoc(shader_program, "pmatrix");
    var mmatrix = render.uniformLoc(shader_program, "mmatrix");
    var vmatrix = render.uniformLoc(shader_program, "vmatrix");
//    pReder.gl().uniform4fv(coordinates, [0.0, 0.0, 0.0, 0.0]);
    return {
        "vertices" : function () { return vertices; }, 
        "prep" : function() 
        {
            pReder.bindBuffer(vertices);
            var posattribloc  = pReder.attribLoc(shader_program, "position");
            pReder.useprogram(shader_program);
            pReder.attribPtr(posattribloc);
        },
        "draw" : function() { pReder.draw(0, meshdb.example001.length / 3); }, 
        "pmat" : function() { return pmatrix; }, 
        "mmat" : function() { return mmatrix; }, 
        "vmat": function() { return vmatrix; },
        "proj": function (angle, a, zMin, zMax) {
            var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
            return [
               0.5/ang, 0 , 0, 0,
               0, 0.5*a/ang, 0, 0,
               0, 0, -(zMax+zMin)/(zMax-zMin), -1,
               0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
            ];
         }
        
    };
};