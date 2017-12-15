// utilites 
var Utils = (function()
{
    console.log("Created utils");

    return {
         "Face": function(vertices) {
            this.vertices = vertices || []
        },
	    "readFile" : function(fname)
	    {
	        var data;
	        var reader = new FileReader();

	        reader.addEventListener("load",
		    function()
		    {
		        data = reader.result;
		    }, false);
	        if (fname) {
		    reader.readAsDataURL(fname);
	        }
	        return data;
	    },
	    "parseObj" : function(src)
	    {
            var POSITION = /^v\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)/
            var NORMAL = /^vn\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)/
            var UV = /^vt\s+([\d\.\+\-eE]+)\s+([\d\.\+\-eE]+)/
            var FACE = /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/

            lines = src.split('\n')
            var positions = []
            var uvs = []
            var normals = []
            var faces = []
            lines.forEach(function (line) {
                // Match each line of the file against various RegEx-es
                var result
                if ((result = POSITION.exec(line)) != null) {
                    // Add new vertex position
                    positions.push(new Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])))
                } else if ((result = NORMAL.exec(line)) != null) {
                    // Add new vertex normal
                    normals.push(new Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])))
                } else if ((result = UV.exec(line)) != null) {
                    // Add new texture mapping point
                    uvs.push(new Vector2(parseFloat(result[1]), 1 - parseFloat(result[2])))
                } else if ((result = FACE.exec(line)) != null) {
                    // Add new face
                    var vertices = []
                    // Create three vertices from the passed one-indexed indices
                    for (var i = 1; i < 10; i += 3) {
                        var part = result.slice(i, i + 3)
                        var position = positions[parseInt(part[0]) - 1]
                        var uv = uvs[parseInt(part[1]) - 1]
                        var normal = normals[parseInt(part[2]) - 1]
                        vertices.push(new Vertex(position, normal, uv))
                    }
                    faces.push(new Face(vertices))
                }
            })
            return faces;
        },
        "Vertex": function (position, normal, uv) {
            this.position = position || new Vector3()
            this.normal = normal || new Vector3()
            this.uv = uv || new Vector2()
        },
        "Vector3": function (x, y, z) {
            this.x = Number(x) || 0;
            this.y = Number(y) || 0;
            this.z = Number(z) || 0;
            this.data = new Array(x, y, z);
            var that = this;
            return { "data": function() { return that.data; } };
        },
        "Vector2": function (x, y) {
            this.x = Number(x) || 0;
            this.y = Number(y) || 0;
            this.data = new Array(x, y);
            var that = this;
            return { "data": function() { return that.data; } };
        }
    };
})();
