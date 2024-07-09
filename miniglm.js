
var VecUtils = function()
{

};


var MiniGLM = function()
{
    var id = new Float32Array(16);
    id[0] = 1.0; id[1] = 0.0; id[2] = 0.0; id[3] = 0.0;
    id[4] = 0.0; id[5] = 1.0; id[6] = 0.0; id[7] = 0.0;
    id[8] = 0.0; id[9] = 0.0; id[10] = 1.0; id[11] = 0.0;
    id[12] = 0.0; id[13] = 0.0; id[14] = 0.0; id[15] = 1.0;

    return {
        "identity" : function() { return id; },
        "scale" : function(x, y, z) 
        {
            var sm = new Float32Array(16);
            sm[0] = x; sm[1] = 0.0; sm[2] = 0.0; sm[3] = 0.0;
            sm[4] = 0.0; sm[5] = y; sm[6] = 0.0; sm[7] = 0.0;
            sm[8] = 0.0; sm[9] = 0.0; sm[10] = z; sm[11] = 0.0;
            sm[12] = 0.0; sm[13] = 0.0; sm[14] = 0.0; sm[15] = 1.0;
            return sm;
        } ,
        "translate" : function(x, y, z) {
            var sm = new Float32Array(16);
            sm[0] = 1.0; sm[1] = 0.0; sm[2] = 0.0; sm[3] = x;
            sm[4] = 0.0; sm[5] = 1.0; sm[6] = 0.0; sm[7] = y;
            sm[8] = 0.0; sm[9] = 0.0; sm[10] = 1.0; sm[11] = z;
            sm[12] = 0.0; sm[13] = 0.0; sm[14] = 0.0; sm[15] = 1.0;
            return sm;
        },
        "rotate" : function(axis, theta) {
            if (axis === 'x' || axis === 'X') {
                return  function() {
                    var sm = new Float32Array(16);
                    sm[0] = 1.0; sm[1] = 0.0; sm[2] = 0.0; sm[3] = 0.0;
                    sm[4] = 0.0; sm[5] = Math.cos(theta ); sm[6] = -Math.sin(theta ); sm[7] = 0.0;
                    sm[8] = 0.0; sm[9] = Math.sin(theta ); sm[10] = Math.cos(theta ); sm[11] = 0.0;
                    sm[12] = 0.0; sm[13] = 0.0; sm[14] = 0.0; sm[15] = 1.0;
                    return sm;                            
                };
            } else if (axis === 'y' || axis == 'Y') {
                return  function() {
                    var sm = new Float32Array(16);
                    sm[0] = Math.cos(theta); sm[1] = 0.0; sm[2] = Math.sin(theta); sm[3] = 0.0;
                    sm[4] = 0.0; sm[5] = 1.0; sm[6] = 0.0; sm[7] = 0.0;
                    sm[8] = -Math.sin(theta); sm[9] = 0; sm[10] = Math.cos(theta ); sm[11] = 0.0;
                    sm[12] = 0.0; sm[13] = 0.0; sm[14] = 0.0; sm[15] = 1.0;
                    return sm;                            
                };
            } else if (axis == 'z' || axis == 'Z') {
                return  function() {
                    var sm = new Float32Array(16);
                    sm[0] = Math.cos(theta); sm[1] = -Math.sin(theta); sm[2] = 0.0; sm[3] = 0.0;
                    sm[4] = Math.sin(theta); sm[5] = Math.cos(theta ); sm[6] = 0.0; sm[7] = 0.0;
                    sm[8] = 0.0; sm[9] = 0.0; sm[10] = 1.0; sm[11] = 0.0;
                    sm[12] = 0.0; sm[13] = 0.0; sm[14] = 0.0; sm[15] = 1.0;
                    return sm;                            
                };

            } else {
                return function() { console.log("inproper ussage"); return id; };
            }
        }        
    };

};