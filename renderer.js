
function setCanvasSize(gl, width, height) {
    gl.viewport(0, 0, width, height);
}

function initGL(gl, width, height) {
	setCanvasSize();
	console.log(width, height);
	gl.viewport(0, 0, width, height);
	gl.clearColor(255, 0, 0, 1);
}

function webglversion(ctx)
{
    var gl2 = null;
    try {
        gl2 = ctx.getContext("webgl2");
    } catch (nowebgl2) {
        console.log("NO webgl2 extensions...");
        try {
            gl2 = ctx.getContext("webgl");
        } catch (nowebgl) {
            console.log("No webgl in browser");
            throw Error("NO WEBGL SUPPORT");
        }
    }
    console.log("Webgl Support API: (" + gl2 + ")");
    return true;
}
