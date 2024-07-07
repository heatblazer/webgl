/** 

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var position = gl.getAttribLocation(shaderProgram, "position");
gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0) ;

// Position
gl.enableVertexAttribArray(position);
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
var color = gl.getAttribLocation(shaderProgram, "color");
gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

// Color
gl.enableVertexAttribArray(color);
gl.useProgram(shaderProgram);
*/

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
//         GL.bindBuffer(GL.ARRAY_BUFFER, null);
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
        console.log("PS: " + shader_source);

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
        console.log("VS: " + shader_source);
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
        var success = GL.getProgramParameter(shaderProgram, GL.LINK_STATUS);
        if (!success) {
            console.log(GL.getProgramInfoLog(shaderProgram));
            GL.deleteProgram(program);
        }
//        GL.useProgram(shaderProgram);
        return shaderProgram;
    }
 

    return {
        "hello" : function() { console.log("hello renderer");}, //dbg test fn
        "gl" : function() { return GL; },
        "init" : function() { initGL(); },
        "clear" :  function(r,g,b,a) { clear(r,g,b,a); },
        "vbo" : function(data) { return vbo(data); },
        "vs" : function(ss) { return create_vertex_shader(ss); },
        "ps" : function(ss) { return create_pixel_shader(ss); },
        "linkProgram" : function(vs, ps) {
            var v = create_vertex_shader(vs);
            var p = create_pixel_shader(ps);
            return create_program(v, p);
        },
        "useprogram" : function(sprogram) { GL.useProgram(sprogram); },
        "bindBuffer" : function(vertexBuffer) {
            GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        },
        "attribLoc" : function(program , attrib) {
            return GL.getAttribLocation(program, attrib);
        }, 
        "attribPtr" : function(attrib) { //TODO: pass more as args
            GL.vertexAttribPointer(attrib, 3, GL.FLOAT, false, 0, 0);
            GL.enableVertexAttribArray(attrib);
        },
        "uniformLoc" : function(program, uform) {
            return GL.getUniformLocation(program, uform);
        },
        "uniform4v" : function(uniformloc, boolstat, data) {
            GL.uniformMatrix4fv(uniformloc, boolstat, data);
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
            GL.drawArrays(GL.TRIANGLES, from, to);
        }
    }
}

