function CartItem() {
  this.cartItems = [];
}

CartItem.prototype.setcartItems = function(tag) {
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
};

CartItem.prototype.getcartItems = function() {
  return this.cartItems;
};


CartItem.prototype.getPromotionText = function() {

  var promotions = loadPromotions();
  var promotionText = '';

  for(var i = 0; i < this.cartItems.length; i++) {
    promotionText += findPromotion(this.cartItems[i], promotions);

  }
  return promotionText;
};

function findPromotion(cartItem, promotions) {
  var promotionText = '';
  for(var j = 0; j < promotions[0].barcodes.length; j++) {

    if(cartItem.item.barcode === promotions[0].barcodes[j]) {
      promotionText += '名称：' + cartItem.item.name +
      '，数量：' + Math.floor(cartItem.count/3) + cartItem.item.unit + '\n';
    }
  }
  return promotionText;
}
