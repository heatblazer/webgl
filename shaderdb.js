/* shaders database */
var shaders = [];

shaders["color1"] = '\n'+
'precision mediump float; \n'+
'void main(void) {\n' +
'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'
+'}\n';

shaders["vertex1"] = '\n' + 
'attribute vec3 aVertexPosition;\n' +
'void main(void) {\n' +
'  //gl_Position = uMVMatrix * uPMatrix * vec4(aVertexPosition, 1.0);\n' +
' gl_Position = vec4(aVertexPosition, 1.0); \n'+
'}\n';
