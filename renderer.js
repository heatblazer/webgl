
var Renderer = function(width, height, canvas)
{
    var GL = null;
    var WIDTH = width;
    var HEIGHT = height;
    function setCanvasSize(width, height) {
        GL.viewport(0, 0, width, height);
    }
    

    function vbo(vertices) {
         // Create an empty buffer object to store the vertex buffer
         var vertex_buffer = GL.createBuffer();
         
         //Bind appropriate array buffer to it
         GL.bindBuffer(GL.ARRAY_BUFFER, vertex_buffer);

         // Pass the vertex data to the buffer
         GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);

         // Unbind the buffer
         GL.bindBuffer(GL.ARRAY_BUFFER, null);

         return vertex_buffer;
    }


    function initGL() {

        try {
            GL = canvas.getContext("webgl2");
            console.log("#####Got webgl ctx...")
        } catch (e) {
            throw new Error("No WebGL support");
            return null;
        }

        setCanvasSize();
        console.log(width, height);
        GL.viewport(0, 0, width, height);
        return GL;
    }

    function clear(r, g, b, a) {
        GL.clearColor(r, g, b, a);
        GL.clear(GL.COLOR_BUFFER_BIT);
    }
    

    function create_pixel_shader(shader_source) {
        if (shader_source === null ) {
            return null;
        }
        var pixel_shader = GL.createShader(GL.FRAGMENT_SHADER);
        GL.shaderSource(pixel_shader, shader_source);
        // Compile the vertex shader
        GL.compileShader(pixel_shader);
        return pixel_shader;
    }

    function create_vertex_shader(shader_source) {
        if (shader_source === null) {
            return null;
        }
        var vertex_shader = GL.createShader(GL.VERTEX_SHADER);
        GL.shaderSource(vertex_shader, shader_source);
        // Compile the vertex shader
        GL.compileShader(vertex_shader);
        return vertex_shader;
    }

    function create_program(vs, ps) {
                // Create a shader program object to store
        // the combined shader program
        var shaderProgram = GL.createProgram();
        // Attach a vertex shader
        GL.attachShader(shaderProgram, vs); 
        // Attach a fragment shader
        GL.attachShader(shaderProgram, ps);
        // Link both programs
        GL.linkProgram(shaderProgram);
        // Use the combined shader program object
        GL.useProgram(shaderProgram);
        return shaderProgram;
    }
 

    return {
        "gl" : function() { return GL; },
        "init" : function() { initGL(); },
        "clear" :  function(r,g,b,a) { clear(r,g,b,a); },
        "vbo" : function(data) { return vbo(data); },
        "vs" : function(ss) { return create_vertex_shader(ss); },
        "ps" : function(ss) { return create_pixel_shader(ss); },
        "linkProgram" : function(vs, ps) {
            var p = create_pixel_shader(ps);
            var v = create_vertex_shader(vs);
            return create_program(v, p);
        },
        "bindBuffer" : function(vertexBuffer) {
            GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        },
        "attribLoc" : function(program , attrib) {
            return GL.getAttribLocation(program, attrib);
        }, 
        "attribPtr" : function(attrib) { //TODO: pass more as args
            GL.vertexAttribPointer(attrib, 3, GL.FLOAT, false, 0, 0);
            // Enable the attribute
            GL.enableVertexAttribArray(attrib);
        },
        "uniformLoc" : function(program, uform) {
            return GL.getUniformLocation(program, uform);
        },
        "draw" : function(from, to) {
            GL.clearColor(0.5, 0.5, 0.5, 0.9);

            // Enable the depth test
            GL.enable(GL.DEPTH_TEST);
    
            // Clear the color buffer bit
            GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
   
            // Set the view port
            GL.viewport(0,0,WIDTH,HEIGHT);
   
            // Draw the triangle
            console.log("FROM "+from+ " TO " + to);
            GL.drawArrays(GL.POINTS, from, to);
        }
    }
}

