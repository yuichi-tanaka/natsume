var util = require('util');
var _print = function(type,message){
  var _t_d = util.debug;
  var dump = console.dir;
  var _f = process.env.NODE_DEBUG ? function(type,message){
    var _flg_array = process.env.NODE_DEBUG.split(',');
    if(process.env.NODE_DEBUG.indexOf('all') < 0 && process.env.NODE_DEBUG.indexOf(type) < 0) return;
    message = message ? message : type;
    var _now = new Date();
    var _y = _now.getFullYear();
    var _m = _now.getMonth()+1;
    var _d = _now.getDate();
    var _h = _now.getHours();
    var _mi = _now.getMinutes();
    var _s = _now.getSeconds();
    var _d_str = util.format('%s/%s/%s %s:%s %s',_y,_m,_d,_h,_mi,_s)
    if(typeof message === 'object'){
      _t_d(util.format('%s [%s] :  ',type,_d_str));
      dump(message);
    }else{
      _t_d(util.format('%s [%s] : %s ',type,_d_str,message));
    }
  } : function(){};
  _f(type,message);
  return _f;
};
module.exports.print = _print;
