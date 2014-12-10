function Cart() {
  this.cartItems = [];
}

Cart.prototype.setcart = function(tag) {
  var cartItems = this.cartItems;
  var items = loadAllItems();
  for(var i = 0; i < tag.length; i++) {
    var tagArray = tag[i].split('-');
    var barcode = tagArray[0];
    var count = 1;
    if(tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }
    var item = _.find(items,{barcode : barcode});
    var cartItem = _.find(cartItems,function(cartItem){
      return cartItem.item.barcode === barcode;
    });
    if(cartItem) {
      cartItem.count += count;
    } else {
      cartItems.push({item:item , count:count});
    }
  }
}

Cart.prototype.getcart = function(tag) {
  return this.cartItems;
}
