
var http = require('http');
var debug = require('../debug').print;
module.exports.start = function(port){
  debug('natsume','slave start');
  http.createServer(function(req,res){
    debug('natsume','natsume get request');
    console.log(req.url);
    var resp = {
      res_code: 200,
      res_message : 'OK'
    };
    if(req.method.toLowerCase() !== 'post') resp = { res_code : 405 , res_message:'Method Not Allowd'};
    res.writeHead(resp.res_code);
    res.end(resp.res_message);
  }).listen(port);
}
