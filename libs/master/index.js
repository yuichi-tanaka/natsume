var cluster = require('cluster');
var debug = require('../debug').print;
module.exports.start = function(childNum){
  debug('natsume','cluster start');
  for(var i = 0; i < childNum; i++){
    cluster.fork();
  }
  cluster.on('exit',function(worker,code,signal){
    debug('natsume','worker ' + worker.process.pid + ' died');
  });
}
