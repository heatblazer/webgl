/* shaders database */
var shaders = [];

shaders["color1"] = "void main(void) {\n" +
                    "gl_FragColor = vec4(255.0, 0.0, 0.0, 1.0);\n"
                    +"}\n";

shaders["vertex1"] = 'attribute vec3 aVertexPosition;\n' +
      'uniform mat4 uMVMatrix;\n' +
      'uniform mat4 uPMatrix;\n' +
        'void main(void) {\n' +
        '  gl_Position = uMVMatrix * uPMatrix * vec4(aVertexPosition, 1.0);\n' +
        '}\n';
