/* shaders database */
var shaders = [];

shaders["color1"] = '\n'+
'precision lowp float;\n'+
'varying vec4 out_color;\n' + 
'void main(void) {\n' +
'gl_FragColor = vec4(out_color);\n'
+'}\n';

shaders["vertex1"] = '\n' + 
'attribute highp vec3 aVertexPosition;\n' +
'attribute highp vec3 aVertexColor;\n' + 
'varying vec4 out_color;\n' + 
'void main(void) {\n' +
' gl_Position = vec4(aVertexPosition, 1.0); \n'+
' out_color = vec4(aVertexColor, 1.0); \n' + 
'}\n';
