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

CartItem.prototype.getCartItemsText = function() {

  var promotioncount = getPromotioncount(this.cartItems);
  var cartItemText = '';

  _.forEach(this.cartItems,function(cartItem, index) {
    var item = cartItem.item;
    var actual = cartItem.count - promotioncount[index];

    cartItemText += '名称：' + item.name +
    '，数量：' + cartItem.count +item.unit +
    '，单价：' + item.price.toFixed(2) + '(元)' +
    '，小计：' + (item.price * actual).toFixed(2) +'(元)\n';

  });
  return cartItemText;
}

function getPromotioncount(cartItems) {
  var promotions = loadPromotions();
  var promotioncount = [];

  for(var i = 0; i < this.cartItems.length; i++) {

    findPromotioncount(promotions[0], this.cartItems[i], promotioncount);
  }
  return promotioncount;
}

function findPromotioncount(promotion, cartItem, promotioncount) {
  for(var j = 0; j < promotion.barcodes.length; j++) {

    if(cartItem.item.barcode === promotion.barcodes[j]) {
      promotioncount.push(0);
    } else {
      promotioncount.push(Math.floor(cartItem.count/3));
    }
  }
}


function getSummaryText(cartItems,total,promotions) {

  var summaryText = '';

  for(var i = 0; i < cartItems.length; i++) {
    summaryText = '总计：' + total.toFixed(2) + '(元)\n' +
    '节省：' + (promotions - total).toFixed(2) + '(元)\n';
  }
  return summaryText;
}

CartItem.prototype.getTotal = function() {

  var total = 0 ;
  var promotioncount = getPromotioncount(this.cartItems);

  for(var i = 0; i < this.cartItems.length; i++) {
    total += this.cartItems[i].item.price * (this.cartItems[i].count -promotioncount[i]);
  }
  return total;
}

CartItem.prototype.getpromotions = function() {

  var promotions = 0 ;
  for(var i = 0; i < this.cartItems.length; i++) {
    promotions += this.cartItems[i].item.price * this.cartItems[i].count;
  }
  return promotions;
}
