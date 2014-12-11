function printInventory(tags) {
  var cart = new CartItem();
  cart.setcartItems(tags);
  var inventory = new Inventory(cart);
  console.log(inventory.toString());
}
