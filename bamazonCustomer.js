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

    // connection.query(
    //     'SELECT * FROM products',
    //   function(err, res) {
    //     if (err) throw err;
    //     // console.log(res);

    //     var productsTable = new Table({
    //         head: ['ID', 'Name', 'Department', 'Price', 'Stock'],
    //     //   , colWidths: [100]
    //     });         
        
    //     for (var i = 0; i < res.length; i++) {
    //         productsTable.push( [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    //     }
    //     console.log(productsTable.toString());
    displayTable();
        // start();
    // });
});

function displayTable (){
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
        console.log("item: "+itemQueryId+"\nquantity: "+answer.quantity);
        connection.query('SELECT stock_quantity from products WHERE ?', {item_id:answer.id},
        function (error, res) {
            if (error) throw error;
            console.log(res);
            var stockAmount = res[0].stock_quantity;
            console.log('stock amount: '+stockAmount);
            var orderAmount = answer.quantity;
            var stockAfterTrans = stockAmount - orderAmount;

            if (stockAmount >= orderAmount){
                console.log ('there is enough in stock' );
                console.log("item query id:"+itemQueryId+"\nstockamount:"+stockAmount+"\norder amount:"+orderAmount+"\nafter trans"+stockAfterTrans);

                connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [stockAfterTrans, itemQueryId],
                function (error, res) {
                    if (error) throw error;
                    console.log(res);
                    displayTable();
                });

            }else{
                console.log ('not enough in stock');
                start();
            };
            
        });
    });
    
    // connection.end();
};