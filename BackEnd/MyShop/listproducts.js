var faker = require("faker");
for (var i = 0; i<10; i++){
    var price = faker.commerce.price();
    var product = faker.commerce.product();
    console.log(product + " - $" + price);
}