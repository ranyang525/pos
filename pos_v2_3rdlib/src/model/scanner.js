function Scanner() {
}

Scanner.prototype.setscanner = function(tag) {
  var items = loadAllItems();
    var tagArray = tag.split('-');
    var barcode = tagArray[0];
    var count = 1;
    if(tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }
    var item = _.find(items,{barcode : barcode});
    var cartItem = new CartItem(item, count);
    return cartItem;
};
