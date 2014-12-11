function printInventory(tags) {

  var scanner = new Scanner();
  var cart = new Cart();

  _.forEach(tags, function(tag) {
    cart.addCartItem(scanner.setscanner(tag));
  });

  var inventory = new Inventory();
  console.log(inventory.toString(cart));
}
