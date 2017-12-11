function loadJs(uri) {
    var s = document.createElement("script");
    s.src = uri;
    document.head.appendChild(s);
}

loadJs("utils.js");
loadJs("worker.js");
loadJs("shaderdb.js");
loadJs("glMatrix.js");



var VBO = function(glRef, data, location)
{
    var buffer = glRef.createBuffer();
    glRef.bindBuffer(glRef.ARRAY_BUFFER, buffer);
    glRef.bufferData(glRef.ARRAY_BUFFER, new Float32Array(data),
	                   glRef.STATIC_DRAW);
    return {
	"id" : function() { return buffer; }
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
	//throw new Error(gl.getShaderInfoLog(id)); // don't thow - it's a warning for not supporting GL_ARB
	console.log(gl.getShaderInfoLog(id));
    }

    return {
	"id" : function() { return  id; }
    }
}

var GLProgram = function(gl, vs, ps)
{
    if (vs === null || ps === null) {
	return false;
    }

    var id = gl.createProgram();
    gl.attachShader(id, vs);
    gl.attachShader(id, ps);
    gl.linkProgram(id);

    if (!gl.getProgramParameter(id, gl.LINK_STATUS)) {
	console.log(gl.getProgramInfoLog(id));
	//throw new Error(gl.getProgramInfoLog(id));
    }

    return {
	     "id" : function() { return id; }
    };
}


var Renderer = function(refGl)
{
    var GL = refGl;

    function testDraw()
    {

      // test data
    	var vtxdata = [
                0.0, 0.5,
    			       0.5, -0.5,
    			      -0.5, -0.5];
      var vtxcolor = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0
      ]

    	var vbo = new VBO(GL, vtxdata);
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
    	if ((program = new GLProgram(GL, vs.id(), ps.id())) != true) {
    	    console.log("OK - PROGRAM");
    	} else {
    	    console.log("FAIL - PROGRAM");
    	    return false;
    	}

      GL.useProgram(program.id());

      var vao = new VAO(GL);

      vao.setup(vbo.id(), 2, GL.getAttribLocation(program.id(), "coordinates"));

      GL.drawArrays(GL.TRIANGLES, 0, 3);
    }


    return {
      "viewport" : function(x, y, w, h)
      {
        GL.viewport(x, y, w, h);
      },
    	"draw": function()
    	{
    	    testDraw();
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
