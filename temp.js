const mysql = require('mysql2');
const express = require('express');
const app = express();
// const cors = require('cors');
app.use(express.static('abc'));

let params = {
	host: 'localhost',
	user: 'shinde',
	password: 'cdac',
	database: 'latur'
	port: 3306
};

const con = mysql.createConnection(params);

app.get("/getBook",(req,resp)=>{
	let bookid1=req.query.bookid;
	console.log(bookid1);

	let details = {status: false, bookdetails: {} };

	con.query('select bookid,bookname,price from book where bookid=?',[bookid1],
	(error,bookRows) => {
		if(error) {
			console.log("Error Occured"+ error);
		}
		else if (bookRows.length > 0) {
			details.status = true;
			details.bookdetails.bookid = bookRows[0].bookid;
			details.bookdetails.bookname = bookRows[0].bookname;
			details.bookdetails.price = bookRows[0].price;
		}
		console.log(bookRows);
		resp.send(details);
	});
	
	
});

// const bodyParser = require('body-parser');






// app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// //whether you want nested objects support  or not



// var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });


// app.get('/poc2', function (req, res) {
    
	
//         console.log("reading input " + req.query.xyz);
		
//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});

app.get("/update",(req,resp) => {
	let bookid2 = req.query.bookid2;
	let bookname2 = req.query.bookname2;
	let price2 = req.query.price2;
	console.log(bookid2,+" "+bookname2+" "+price2);

	let details = {status: false};

	con.query('update book set bookname=?,price=? where bookid=?', [bookname2,price2,bookid2],
	(error,bookRows) => {
		if(error){
			console.log("Error "+error);
		
		}
		else if (bookRows.affectedRows > 0){
			details.status = true;
		}
		console.log(bookRows);
		resp.send(details);
	});
	
});
	




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});