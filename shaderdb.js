/* shaders database */
var shaders = [];

shaders["reelrot"] = '\n' + 
'attribute vec3 position; \n ' +
'uniform mat4 pmatrix; \n' + 
'uniform mat4 mmatrix; \n' + 
'uniform mat4 vmatrix; \n' + 
'attribute vec3 color; \n' + 
'varying vec3 vColor; \n' +
'uniform mat4 xrot; \n' + 
'uniform mat4 yrot; \n' +
'void main(void) { \n' + 
' gl_Position = xrot * yrot *vec4(position, 1.); \n' + 
'}\n' 
;

shaders["reelcol"] = '\n' +
'precision mediump float; \n' + 
'varying vec3 vColor; \n' + 
'void main(void) { \n' + 
'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' + 
'}\n';
