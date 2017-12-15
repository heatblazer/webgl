var Worker = function(userData, cb, speed)
{
    // myst chech for types... functions, object, etc
    var data = userData; 
    var fun = cb;
	var isRunning = false;
	var _speed = speed | 0; 
    var loop = function()
    {
	if (fun !== null && data !== null) {
		fun(data); 
	}
	if (isRunning)
		setTimeout(loop, _speed);
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
    }; 
}
