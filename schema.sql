DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) Null,
    department_name VARCHAR(255) Null,
    price DECIMAL(10,2) Null,
    stock_quantity INT Null,
    PRIMARY KEY(item_id)
);