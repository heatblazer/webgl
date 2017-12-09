var Worker = function(userData, cb)
{
    // myst chech for types... functions, object, etc
    var data = userData; 
    var fun = cb;
    var isRunning = false;
    var loop = function()
    {
	console.log("loop");
	if (isRunning)
	    setTimeout(loop, 100);
    }
    
    return {
	"start" : function() 
	{
	    if (isRunning) {
		return;
	    } else {
		isRunning = true;
		loop();
	    } 
	},
	"stop" : function() 
	{
	    if (isRunning) {
		isRunning = false;
	    } 
	}
    }
}
