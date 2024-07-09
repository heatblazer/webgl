//reel anim


//var color = gl.getAttribLocation(shaderProgram, "color");
//         gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

var Reels = function(pReder)
{
    var vertices = pReder.vbo(meshdb.cube2.v);
  //  var colors = pReder.vbo(colmap);
    
  
    var shader_program = pReder.linkProgram(shaders["reelrot"], shaders["reelcol"]);
    var pmatrix = render.uniformLoc(shader_program, "pmatrix");
    var mmatrix = render.uniformLoc(shader_program, "mmatrix");
    var vmatrix = render.uniformLoc(shader_program, "vmatrix");
    var xrot = render.uniformLoc(shader_program, "xrot");
    var yrot = render.uniformLoc(shader_program, "yrot");
    var scaler = render.uniformLoc(shader_program, "scale");
//    pReder.gl().uniform4fv(coordinates, [0.0, 0.0, 0.0, 0.0]);
    return {
        "vertices" : function () { return vertices; }, 
        "prep" : function() 
        {
        //    pReder.bindBuffer(vertices);
            var posattribloc  = pReder.attribLoc(shader_program, "position");
            pReder.useprogram(shader_program);
            pReder.attribPtr(posattribloc, 3);
        },
        "draw" : function() { pReder.draw(0, meshdb.cube2.v.length / 3); }, 
        "pmat" : function() { return pmatrix; }, 
        "mmat" : function() { return mmatrix; }, 
        "vmat": function() { return vmatrix; },
        "xrot" : function() { return xrot; },
        "yrot" : function() { return yrot; },
        "scale" : function() { return scaler; }, 
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