function loadJs(uri) {
    var s = document.createElement("script");
    s.src = uri;
    document.head.appendChild(s);
} 

loadJs("utils.js");
loadJs("worker.js");
loadJs("shaderdb.js");



var VBO = function(glRef, data)
{
    var buffer = glRef.createBuffer();
    glRef.bindBuffe(glRef.ARRAY_BUFFER, buffer);
    glRef.bufferData(glRef.ARRAY_BUFFER, new Float32Array(data),
	gl.STATIC_DRAW);
    
    return {
	"id" : function() { return buffer; }
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
	"id" : function() { return  this.id; }
    }
}


var Renderer = function(refGl)
{
    var GL = refGl;
    
    
    function testDraw()
    {
	Utils.test();
	console.log(shaders["color1"]);
	var ps = new Shader(GL, GL.FRAGMENT_SHADER, shaders["color1"]);
	if (ps) {
	    console.log("OK - fragment shader");
	}
	var vs = new Shader(GL, GL.VERTEX_SHADER, shaders["vertex1"]);
	if (vs) {
	    console.log("OK - vertex shader");
	}
    }
    
    
    return {
	"draw": function() 
	{ 
	    testDraw();
	},
	"clear" : function(r, g, b, a) 
	{
	}
    };
}

