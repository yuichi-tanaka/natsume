var cluster = require('cluster');
var master = require('./libs/master');
var slave = require('./libs/slave');
var debug = require('./libs/debug').print;

if(cluster.isMaster){
debug('natsume','natsume master start');
master.start(4);
}else{
debug('natsume','natsume slave start');
slave.start(8080);
}

