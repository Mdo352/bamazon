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
    start();
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
        console.log(productsTable.toString() + "\n\n\n");
        start();
    });
};

function lowInventory(){
    connection.query(
        'SELECT * FROM products WHERE stock_quantity <= 50',
      function(err, res) {
        if (err) throw err;
        // console.log(res);

        var productsTable = new Table({
            head: ['ID', 'Name', 'Department', 'Price', 'Stock'],
        });         
        
        for (var i = 0; i < res.length; i++) {
            productsTable.push( [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log("\nSTOCK IS LESS THAN 50!!!\nORDER MORE");
        console.log(productsTable.toString()+"\n\n\n");
        start();
    });
};

function addStock(){
    inquirer
    .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you want to restock?",

        },
        {
            name: "orderAmount",
            type: "input",
            message: "How many would you like to order?",

        }
    ])
    .then(function(answer) {
        var id = answer.id;
        var orderSize = parseInt(answer.orderAmount);
        var stockAfterTrans = 0;
        var currentStock = 0;

        connection.query('SELECT stock_quantity from products WHERE ?',
        {item_id:answer.id},
        function (error, res) {
            if (error) throw error;
            // console.log(res[0].stock_quantity);
            currentStock = parseInt(res[0].stock_quantity);
            stockAfterTrans = currentStock+orderSize;

            connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?',
            [stockAfterTrans, id],
            function(err, res) {
                if (err) throw err;
                // console.log(res);
                displayTable();
            });

        });


    });
};

function newProduct(){
    inquirer
    .prompt([
        {
            name: "productName",
            type: "input",
            message: "Name of new product?"
        },
        {
            name: "deptName",
            type: "input",
            message: "Department of new product"
        },
        {
            name: "cost",
            type: "input",
            message: "Price of item?"
        },
        {
            name: "stock",
            type: "input",
            message: "How Many Units do you have?"
        }
    ])
    .then(function(answer) {
        // console.log(answer);
        connection.query(
        "INSERT INTO products (product_name, department_name, price, stock_quantity)VALUES (?, ?, ?, ?)",
        [answer.productName, answer.deptName, answer.cost, answer.stock],
        function(err, res) {
            if (err) throw err;
            // console.log(res);
            displayTable();
        });
    });
};

function start(){
    inquirer
    .prompt([
        {
            name: "action",
            type: "list",
            message: "Please select one of the options below?",
            choices: ["View Products", "View Low Inventory", "Add To Inventory", "Add New Product", "EXIT"]

        }
    ])
    .then(function(answer) {

        switch(answer.action){
            case "View Products":
                displayTable();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add To Inventory":
                addStock();
                break;

            case "Add New Product":
                newProduct();
                break;

            case "EXIT":
                connection.end();
        };
    });
};