// global test data 
cubedata = [
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    
];

 colordata = 
[
    1.0, 0.1, 0.1,
    0.1, 1.0, 0.1, 
    0.1, 0.1, 1.0
]

var VBO = function(glRef, data, isize, inums)
{
    var _itemSize = isize;
    var _numItems = inums;
     buffer = glRef.createBuffer();
    glRef.bindBuffer(glRef.ARRAY_BUFFER, buffer);
    glRef.bufferData(glRef.ARRAY_BUFFER, new Float32Array(data),
	                   glRef.STATIC_DRAW);
                       
    return {
      	"id" : function() { return buffer; },
        "itemSize" : function() { return _itemSize; },
        "numItems" : function() { return _numItems; }
    };
}


var VAO = function(gl)
{
    var id = gl.createVertexArray();
    gl.bindVertexArray(id); 
    return {
	     "bind" : function(vbo, location, stride)
        	{
        	    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
                gl.vertexAttribPointer(location, stride, gl.FLOAT, false, 0, 0);
        	}
    };
}

var Shader = function(gl, type, src)
{
    if (gl === null) {
	     throw new Error("NO GL REFERENCE!!!");
    }
    var id = undefined;
    switch (type) 
    {
        case gl.VERTEX_SHADER:
            id = gl.createShader(gl.VERTEX_SHADER);
            break;
        case gl.FRAGMENT_SHADER:
            id = gl.createShader(gl.FRAGMENT_SHADER);
            break;
        default:
            throw Error("INVALID SHADER PARAMETER");
    }    
    console.log(src);    
    gl.shaderSource(id, src);
    gl.compileShader(id);

    if (gl.getShaderParameter(id, gl.COMPILE_STATUS)) {
          	//throw new Error(gl.getShaderInfoLog(id)); // don't thow - it's a warning for not supporting GL_ARB, handle it if needed
	         console.log(gl.getShaderInfoLog(id));
    } else {
        console.log("Shader type: ("+ type + ") - status OK");
    }

    return {
	       "id" : function() { return  id; }
    }
}

var GLProgram = function(gl, vs, ps)
{
    if (vs === null || ps === null) {
	     throw new Error("No shaders sources!");
    }

    var id = gl.createProgram();
    gl.attachShader(id, vs);
    gl.attachShader(id, ps);
    gl.linkProgram(id);
    if (!gl.getProgramParameter(id, gl.LINK_STATUS)) {
	       console.log(gl.getProgramInfoLog(id));
	       throw new Error(gl.getProgramInfoLog(id));
    }

    return {
         "id" : function() { return id; } ,
         "setupAttrib" : function(location)
         {
            gl.enableVertexAttribArray(location); 
         },
        "useProgram" : function() {
             gl.useProgram(id); 
         }
    };
}


var Renderer = function(refGl)
{
    var GL = refGl;
    /**
    * test renderidng function
    */
    var this_object = this;

    // remove afer test
    if (true) 
    {
        var  vs = new Shader(GL, GL.VERTEX_SHADER, shaders["vertex1"]);
        var  ps = new Shader(GL, GL.FRAGMENT_SHADER, shaders["color1"]);        
        var  program = null;

        var  vao = new VAO(GL);        
        var vtxvbo = new VBO(GL, cubedata, 3, 3);
        var colvbo = new VBO(GL, colordata, 3, 3); 
        try {
            program = new GLProgram(GL, vs.id(), ps.id());
            console.log("OK made program...")
        } catch (ex) {
           throw new Error(ex);  
        }
        program.useProgram();
        program.setupAttrib(0);
        program.setupAttrib(1);

    } else {
        throw Error("Not used!");
    }

    return {
      "setMatUniforms" : function(location, mat4) {
          GL.uniformMatrix4fv(location, false, mat4);
      },
      "viewport" : function(x, y, w, h)
      {
          GL.viewport(x, y, w, h);
      },
    	"draw": function()
        {   
            vao.bind(vtxvbo.id(), 0, 3);
            vao.bind(colvbo.id(), 1, 3);
            GL.drawArrays(GL.TRIANGLES, 0, 3);
    	},
    	"clear" : function(r, g, b, a)
    	{
    	    GL.clearColor(r, g, b, a);
    	    GL.clear(GL.COLOR_BUFFER_BIT|GL.DEPTH_BUFFER_BIT);
    	},
      "depthTest" : function(ok) {
        if (ok)
          GL.enable(GL.DEPTH_TEST);
      }
    };
}
