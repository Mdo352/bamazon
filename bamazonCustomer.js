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
    displayTable();
});

function displayTable (){
    connection.query(
        'SELECT * FROM products',
      function(err, res) {
        if (err) throw err;
        // console.log(res);

        var productsTable = new Table({
            head: ['ID', 'Name', 'Department', 'Price', 'Stock'],
        });         
        
        for (var i = 0; i < res.length; i++) {
            productsTable.push( [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(productsTable.toString())
        start();
    });
};

function start(){
    inquirer
    .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you want to purchase?",

        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like purchase?"
        }
    ])
    .then(function(answer) {
        var itemQueryId = answer.id
        connection.query('SELECT * from products WHERE ?', {item_id:answer.id},
        function (error, res) {
            if (error) throw error;
            // console.log(res);
            var stockAmount = res[0].stock_quantity;
            var unitPrice = res[0].price;
            var orderAmount = answer.quantity;
            var stockAfterTrans = stockAmount - orderAmount;

            if (stockAmount >= orderAmount){
                connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [stockAfterTrans, itemQueryId],
                function (error, res) {
                    if (error) throw error;
                    // console.log(res);
                    console.log('Thank You for shopping with us\nThe total amount of your purchase was: '+ unitPrice * orderAmount );
                    loop();
                    // displayTable();
                });

            }else{
                console.log ('Not Enough In Stock');
                start();
            };
            
        });
    });
};

function loop(){
    inquirer
    .prompt({
      name: "loop",
      type: "list",
      message: "Would you like to buy something else?",
      choices: ["Continue Shopping", "EXIT"]
    })
    .then(function(answer) {
    
        switch(answer.loop){
            case 'Continue Shopping':
            return displayTable();

            case 'EXIT':
            connection.end();
        };
    });
};