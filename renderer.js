
loadJs("utils.js");
loadJs("worker.js");
loadJs("glMatrix.js");



var VBO = function(glRef, data, isize, inums)
{
    var _itemSize = isize;
    var _numItems = inums;
    var buffer = glRef.createBuffer();
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
    var _gl = gl;
    if (_gl === null) {
      return null;
    }
    return {
	     "setup" : function(vbo, stride, location)
        	{
        	    _gl.enableVertexAttribArray(location);
        	    _gl.bindBuffer(_gl.ARRAY_BUFFER, vbo);
        	    _gl.vertexAttribPointer(location, stride, _gl.FLOAT, false, 0, 0);
        	}
    };
}

var Shader = function(gl, type, src)
{
    if (gl === null) {
	     throw new Error("NO GL REFERENCE!!!");
    }
    var id = 0 | 0;
    if (type === gl.VERTEX_SHADER) {
	     id = gl.createShader(gl.VERTEX_SHADER);
    } else if (type === gl.FRAGMENT_SHADER) {
	     id = gl.createShader(gl.FRAGMENT_SHADER);
    } else {
	     return null;
    }
    gl.shaderSource(id, src);
    gl.compileShader(id);

    if (gl.getShaderParameter(id, gl.COMPILE_STATUS)) {
          	//throw new Error(gl.getShaderInfoLog(id)); // don't thow - it's a warning for not supporting GL_ARB, handle it if needed
	         console.log(gl.getShaderInfoLog(id));
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
	     "id" : function() { return id; }
    };
}


var Renderer = function(refGl)
{
    var GL = refGl;
    /**
    * test renderidng function
    */
    var this_object = this;

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
        var vtxdata = [
            0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0];

        var mVMatrix = mat4.create();
        var pMVatrix = mat4.create();


        var vtxvbo = new VBO(GL, vtxdata, 3, 3);

        var ps = new Shader(GL, GL.FRAGMENT_SHADER, shaders["color1"]);

        if (ps) {
            console.log("OK - fragment shader");
        } else {
            return false;
        }
        var vs = new Shader(GL, GL.VERTEX_SHADER, shaders["vertex1"]);

        if (vs) {
            console.log("OK - vertex shader");
        } else {
            return false;
        }

        var program = null;
        try {
          program = new GLProgram(GL, vs.id(), ps.id());
        } catch (ex) {
          console.log(ex);
        }

        console.log("OK GLProgram")

        GL.useProgram(program.id());
        var vao = new VAO(GL);

        //mat4.perspective(45, 640/480, 0.1, 100.0, pMVatrix);
        //mat4.identity(mVMatrix);
        //mat4.translate(mVMatrix, [-1.5, 0.0, -7.0]);

        // sttup vertex aray buffer here
        vao.setup(vtxvbo.id(), vtxvbo.itemSize(),
                  GL.getAttribLocation(program.id(), "aVertexPosition"));
        GL.drawArrays(GL.TRIANGLES, 0, 3);
    	},
    	"clear" : function(r, g, b, a)
    	{
    	    GL.clearColor(r, g, b, a);
    	    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    	},
      "depthTest" : function(ok) {
        if (ok)
          GL.enable(GL.DEPT_TEST);
      }
    };
}


function testDraw(Rndr, GL)
{


  // test data


  // location matrix
  //var mvmloc = GL.getUniformLocation(program.id(), "uMVMatrix");

  // model view projection matri
  //var mvploc = GL.getUniformLocation(program.id(), "uPMatrix");

  //Rndr.setMatUniforms(mvmloc, mVMatrix);
  //Rndr.setMatUniforms(mvploc, pMVatrix);

}
