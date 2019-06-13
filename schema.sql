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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ryobi Electric Riding Mower", "Home & Garden", 2899.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("New Balance Love 997", "Sneakers", 220.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ring Video Doorbell Pro", "Home & Garden", 249.99, 255);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ninja Pro Blender", "Kitchen", 56.43, 836);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Weber Charcoal Grill", "Home & Garden", 109.00, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cuisinart Air Fryer", "Kitchen", 65.75, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption 2 - Deluxe Edition", "Gaming", 80.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Air Force 1", "Sneakers", 90.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose QC35", "Audio", 299.52, 2500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch 32GB", "Gaming", 299.75, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JBL Charge 4", "Audio", 119.99, 432);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Ultraboost", "Sneakers", 180.00, 156);

-- SELECT * FROM products;