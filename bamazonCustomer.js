var mysql = require('mysql');
const connection = mysql.createConnection({
  host      : 'localhost',
  user      :  'root',
  password  :  '11051997',
  database  : 'bamazon'
})

connection.connect();

// connection.query('SELECT * FROM products', function(error, results, fields) {
// 	if (error) throw error;
// 	console.log(results);
// });

//Please enter the id of the product you want to buy
//how many units of " " do you want to buy

function checkAvailability(id, units) {
	connection.query('SELECT stock_quantity from products WHERE item_id = ?', id, 
		function(error, results, fields) {
			if(error) throw error;
			results = results[0].stock_quantity;
			if(units <= parseInt(results)) buy(id, results - units);
			else console.log("Insufficient quantity")
		});
}

function buy(id, units) {
	connection.query('UPDATE products SET stock_quantity=? WHERE item_id = ?', [units, id], 
		function(error, results, fields) {
			if(error) throw error;
			console.log(results);
		});
}
checkAvailability(5, 200);
