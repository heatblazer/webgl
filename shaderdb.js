/* shaders database */
var shaders = [];

shaders["color1"] = '\n'+
'precision lowp float;\n'+
'varying vec4 out_color;\n' + 
'void main(void) {\n' +
'gl_FragColor = vec4(out_color);\n'
+'}\n';

shaders["color2"] = 
   'void main(void) {\n' +
               ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
            '}';

shaders["vertex2"] =   
'attribute vec3 coordinates;\n' +
'void main(void) {' +
   ' gl_Position = vec4(coordinates, 1.0);' +
   'gl_PointSize = 5.0;'+
'}';

shaders["color3"] = 
   '\n' + 
   'void main(void) {\n' +
               ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
            '}';

shaders["vertex3"] = 
'uniform vec4 uOffset; \n' +   
'attribute vec3 coordinates;\n' +
'void main(void) {' +
   ' gl_Position = vec4(coordinates, 1.0)+uOffset;' +
   'gl_PointSize = 5.0;'+
'}';


shaders["vertex1"] = '\n' + 
'attribute highp vec3 aVertexPosition;\n' +
'attribute highp vec3 aVertexColor;\n' + 
'varying vec4 out_color;\n' + 
'void main(void) {\n' +
' gl_Position = vec4(aVertexPosition, 1.0); \n'+
' out_color = vec4(aVertexColor, 1.0); \n' + 
'}\n';
