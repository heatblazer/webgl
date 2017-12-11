// keymap db
var KeyMap = (function()
{
    var keys = [];

    return {
      "add" : function(key, val) {
         keys[key] = val;
      },
      "remove" : function(key) {
        if (keys[key] !== null) {
           delete keys[key];
           keys[key] = null;
        }
      },
      "pressed" : function(key) {
        return (keys[key] !== null) ? keys[key] : false;
      }
    }
})(/*instance*/);