var form = formidable.IncomingForm();
	form.encoding = 'utf-8';//设置编辑  
	form.uploadDir = "public/avatar/";//设置文件存储路径  
	form.keepExtensions = true;//保留后缀        
	form.maxFieldsSize = 2 * 1024 * 1024;//设置单文件大小限制 
	//form.maxFields = 1000;  设置所以文件的大小总和


module.exports = pool;  