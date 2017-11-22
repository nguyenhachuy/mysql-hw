var mysql = require('mysql');
const connection = mysql.createConnection({
  host      : 'localhost',
  user      :  'root',
  password  :  '11051997',
  database  : 'bamazon'
})

var inquirer = require('inquirer');
var questions = [
	{type: 'input' , name:'id', message: 'Please enter the id of the product you want to buy?'},
	{type: 'input' , name:'units', message: 'how many units do you want to buy?'},

]

connection.connect();
function displayItems() {
	connection.query('SELECT * FROM products', function(error, results, fields) {
		if (error) throw error;
		results.forEach((value) => 
			console.log(value.item_id + "\t name: " + value.product_name 
				+ "\t Price: " + value.price 
				+ "\t stock_quantity: " +
			value.stock_quantity));	
		inquire();
	}); 

}

function run() {
	displayItems();

}
run();

function inquire() {
	inquirer.prompt(questions).then(answers => {
		// Use user feedback for... whatever!!
		checkAvailability(answers.id, answers.units);

	});
}


function checkAvailability(id, units) {
	connection.query('SELECT stock_quantity, price from products WHERE item_id = ?', id, 
		function(error, results, fields) {
			if(error) throw error;
			var price = results[0].price;
			results = results[0].stock_quantity;
			if(units <= parseInt(results)) buy(id, results - units, units, price);
			else {console.log("Insufficient quantity"); 
						return;};
		});
}

function buy(id, end, units, price) {
	connection.query('UPDATE products SET stock_quantity=? WHERE item_id = ?', [end, id], 
		function(error, results, fields) {
			if(error) throw error;
			console.log("\n TOTAL COST: \t" + price*units+ '\n');
			console.log("\n YOUR NEW ITEM INVENTORY AFTER PURCHASE \n")
			displayItems();
		});
}
