var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "**REDACTED**",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    //   console.log("connected as id " + connection.threadId);
    connection.query(
        'SELECT * FROM products',
      function(err, res) {
        if (err) throw err;
        // console.log(res);

        var productsTable = new Table({
            head: ['ID', 'Name', 'Department', 'Price', 'Stock'],
        //   , colWidths: [100]
        });         
        
        for (var i = 0; i < res.length; i++) {
            productsTable.push( [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(productsTable.toString());
        start();
    });
});

function start(){
    inquirer
    .prompt({
        name: "query",
        type: "input",
        message: "What is the ID of the product you want to purchase?",
    })
    .then(function(answer) {
        console.log("query for that item:" + answer.query);
    });
    
    connection.end();
};