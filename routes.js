var multer = require('multer');
var fs = require('fs');
var uploads = multer({
	dest: 'public/images/uploaded_file'
});
module.exports = { 	
	init: function(app,connection){

	app.post('/auth/login', function (req, res){ 

		connection.query('select user_id,user_name from user where user_name = ? and pass = ?', [req.body.user_name, req.body.pass], function (err,result){	
			if(err) {
				console.error(err);
				return;
			}
			console.log(result);
			res.send(result);
		});	

	});

		app.post('/signup', function (req, res) {
			
		     var user = {
			     user_name: req.body.user_name,
                 pass: req.body.pass,
                 address: req.body.address,
                 contact_no: req.body.contact_no
			      
		     };

		     console.log('user');
		     connection.query('insert into user set ?', user, function (err,result){
			     if(err) {
			     	console.error(err);
			     	return;

			     }
			     console.error(result);
			     res.send(result);
		     });
		     console.log('user');

		     res.send('submitted');
		  
		});
		
		app.post('/add_to_bag', function (req, res) {
			
			console.log('user_bag');
		     var bag = {
			     user_id: req.body.user_id,
                 product_id: req.body.product_id
             
			      
		     };

		     console.log('user_bag');
		     connection.query('insert into bag set ?', bag, function (err,result){
			     if(err) {
			     	console.log(err);
			     	return;

			     }
			     console.log(result);
			     res.send(result);
		     });
		     console.log('bag');


		  
		});
		app.post('/remove_from_bag', function (req, res) {
			
			console.log('remove_bag');
		     

		 
		     connection.query('delete from bag where user_id=? and product_id=?', [req.body.user_id,req.body.product_id],function (err,result){
			     if(err) {
			     	console.log(err);
			     	return;

			     }
			     console.log(result);
			     res.send(result);
		     });
		     console.log('removedfrombag');


		  
		});


		app.get('/showsubtype', function(req, res) {
			connection.query('select * from subtype where type_id=?',[req.query.type_id], function(err, result) {
				console.log(result);
				res.send(result);
			});
		});






		app.get('/showtype', function(req, res) {
			connection.query('select * from type', function(err, result) {
				res.send(result);
			});
		});

		app.get('/show/:item', function(req, res) {
			connection.query('select * from product where product_type = ?', [req.params.item], function(err, result) {
				console.log(result);
				res.send(result);
			});
		});
		// app.get('/show/kanjeevaram', function(req, res) {
		// 	console.log('hii');
		// 	connection.query('select * from product where product_subtype=1', function(err, result) {
		// 		console.log('hii');
		// 		res.send(result);
		// 	});
		// });


		
		app.get('/productdetails', function (req, res){   
			console.log('id======'+req.query.pid);
		    var product_id= req.query.pid;
			connection.query('select product_id,product_type,product_subtype,product_description,product_price,img,img1,img2,img3 from product where product_id=?',[product_id],function (err,result){	 
				if(err) {
					console.log(err); 
					return;
				}
				res.send(result); 
			});
		});
		app.get('/cart', function (req, res){   
			console.log(req.query.user_id);
		    var user_id= req.query.user_id;
			connection.query('select product.product_id,product_type,product_subtype,product_price,img from product,bag where product.product_id= bag.product_id and bag.user_id=?',[user_id],function (err,result){	 
				if(err) {
					console.log(err); 
					return;
				}
				res.send(result); 
			});
		});
		app.post('/auth/admin_login', function (req, res){ 

			connection.query('select id,username from admin where username = ? and pass = ?', [req.body.username, req.body.pass], function (err,result){	
				if(err) {
					console.error(err);
					return;
				}
				res.send(result);
			});	

		});

		app.post('/admin_signup', function (req, res) {
			
		     var user = {
			      
			      username:req.body.username,	
			      pass:req.body.pass
		     };

		     console.log('user');
		     connection.query('insert into admin set ?', user, function (err,result){
			     if(err) {
			     	console.error(err);
			     	return;

			     }
			     console.error(result);
		     });
		     console.log('user');

		     res.send('submitted');
		  
		});
		app.post('/add_product', uploads.any(), function (req, res) {
				
			console.log(req.body);

			console.log(req.files);

		     var product = {
			    product_type: req.body.product_type,
                product_subtype: req.body.product_subtype,
                product_description: req.body.product_description,
                date_of_manufacture: req.body.date_of_manufacture, 
                product_price: req.body.product_price,
                img: req.files[0].path.substring(6),
                img1: req.files[1].path.substring(6),
                img2: req.files[2].path.substring(6),
                img3: req.files[3].path.substring(6),
             };

		     connection.query('insert into product set ?', product, function (err,result){
			      if(err) {
			     	console.error(err);
			     	return;

			     }
			     
			     // fs.readFile();


		      res.send('inserted');
		       });
		  
		});
		app.post('/add_subtype',function (req, res) {
		    var subtype = {
				type: req.body.type
            };
		    connection.query('insert into subtype set ?', subtype, function (err,result){
				if(err) {
			    	console.error(err);
			     	return;
			    }
		    	res.send('inserted');
			});
		});
	}
}
