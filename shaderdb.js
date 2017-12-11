/* shaders database */
var shaders = [];

shaders["color1"] = "void main(void) {" +
                    "gl_FragColor = vec4(255.0, 0.0, 0.0, 1.0);"
                    +"}";

shaders["vertex1"] = 'attribute vec2 coordinates;' +
        'void main(void) {' +
        '  gl_Position = vec4(coordinates, 0.0, 1.0);' +
        '}';
