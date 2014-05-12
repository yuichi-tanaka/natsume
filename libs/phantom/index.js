var phantom = require('phantom');
var urlParser = require('url');
var format = require('util').format;
var fs = require('fs');
process.on('message',function(m){
	var url = urlParser.parse(m.url).href;
	var fileName = m.fileName;
	var contentName = m.contentName;
	phantom.create(function(ph){
		ph.createPage(function(page){
			page.open(url,function(status){
				console.log('this url open url = ',url,' open status = ',status  );
				if(status === 'success'){
					setTimeout(function(){
					page.evaluate(function(){
						console.log('evaluate ????');
						var title = '';
						if(document.querySelector('title')){
							title = document.querySelector('title').innerText;
						}
						var description = '';
						if(document.querySelector('meta[name=description]')){
							description = document.querySelector('meta[name=description]').getAttribute('content');
						}
						return {title:title,description:description};
					},function(result){
						page.get('content',function(content){
							fs.writeFile(format('/tmp/%s',contentName),content,function(err){
								if(err) {
									process.send({status:false,message:'html failt'});
									ph.exit();
								}
								page.render(format('/tmp/%s' , fileName),function(){
									console.log('write done file = /tmp/',fileName);
									ph.exit();
									console.log('send child to parent !!!!!');
									var title = result.title ? result.title : "";
									var description = result.description ? result.description : "";
									process.send({status: status,title:title,description:description});
								});
							});
						});
					});
					},1000);
				}else{
					//error
					process.send({status:status});
					ph.exit();
				}
			});
		});
	});
});
