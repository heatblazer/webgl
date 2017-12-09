


var Utils = (function()
{
    console.log("Created utils");
    
    return {
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
	"test" : function() { console.log("OK"); }
	
    };
})();
