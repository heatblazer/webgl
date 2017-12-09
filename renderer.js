function loadJs(uri) {
    var s = document.createElement("script");
    s.src = uri;
    document.head.appendChild(s);
} 

loadJs("utils.js");
loadJs("worker.js");

var Renderer = function(refGl)
{
    var GL = refGl;
    
    
    function testDraw()
    {
	Utils.test();
	Utils.readFile("color.ps");
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


