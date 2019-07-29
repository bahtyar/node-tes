//import library
const express 	= require('express');
const path 		= require('path');
const mongoose	= require('mongoose');

//create connection
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//check connection
db.once('open',()=>{
	console.log('Conected to MongoDB');
});

//check for DB errors
db.on('error',(err)=>{
	console.log(err);
});

//init 
const app = express();
//define port
const port = 3000;

//bring to models
let Article = require('./models/article');

//load view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//home route
app.get('/', (req, res)=>{	
	Article.find({},(err,articles)=>{		
		if(err){
			console.log(err);
		}else{
			res.render('index', {
				title:'Articles', articles:articles
			});
		}
	});
});

//Add route
app.get('/articles/add', (req, res)=>res.render('add_article',{title:'Add Articles'}));
//start server
app.listen(port, ()=>console.log(`Example app listening on port ${port}!`));