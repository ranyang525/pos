function printInventory(tags) {
  var cartItems = getCartItems(tags);
  var inventoryText = getInventoryText(cartItems);
  console.log(inventoryText);
}

function getCartItems(tags) {
  var cartItems = [];
  var items = loadAllItems();
  for (var i = 0; i < tags.length; i++) {
    var tagArray = tags[i].split('-');
    var barcode = tagArray[0];
    var count = 1;
    if (tagArray[1]) {
      count = parseFloat(tagArray[1]);
    }
    var item = _.find(items,{barcode : barcode});
    var cartItem = _.find(cartItems,function(cartItem){
      return cartItem.item.barcode === barcode;
    });
    if(cartItem) {
      cartItem.count += count;
    }
    else {
      cartItems.push({item:item , count:count});
    }
  }
  return cartItems;
}

function getInventoryText(cartItems) {
  var inventoryText = '';
  var total = getTotal (cartItems);
  var promotions = getpromotions(cartItems);
  var cartItemText = getCartItemsText(cartItems);
  var promotionText = getPromotionText(cartItems);
  var summaryText = getSummaryText(cartItems,total,promotions);
  var text =
            '***<没钱赚商店>购物清单***\n' + cartItemText +
            '----------------------\n' + '挥泪赠送商品：\n' +promotionText +
            '----------------------\n' + summaryText +
            '**********************';
  return text;
}

function getCartItemsText(cartItems) {

  var promotioncount = getPromotioncount(cartItems);
  var cartItemText = '';

  _.forEach(cartItems,function(cartItem, index) {
    var item = cartItem.item;
    var actual = cartItem.count - promotioncount[index];

    cartItemText += '名称：' + item.name +
                    '，数量：' + cartItem.count +item.unit +
                    '，单价：' + item.price.toFixed(2) + '(元)' +
                    '，小计：' + (item.price * actual).toFixed(2) +'(元)\n';

  });
  return cartItemText;
}

function getPromotionText(cartItems) {

  var promotions = loadPromotions();
  var promotionText = '';

  for(var i = 0; i < cartItems.length; i++) {
    promotionText += findPromotion(cartItems[i], promotions);

  }
  return promotionText;
}

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

function getSummaryText(cartItems,total,promotions) {

  var summaryText = '';

  for(var i = 0; i < cartItems.length; i++) {
    summaryText = '总计：' + total.toFixed(2) + '(元)\n' +
                  '节省：' + (promotions - total).toFixed(2) + '(元)\n';
  }
  return summaryText;
}

function getPromotioncount(cartItems) {
  var promotions = loadPromotions();
  var promotioncount = [];

  for(var i = 0; i < cartItems.length; i++) {

    findPromotioncount(promotions[0], cartItems[i], promotioncount);
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

function getTotal(cartItems) {

  var total = 0 ;
  var promotioncount = getPromotioncount(cartItems);

  for(var i = 0; i < cartItems.length; i++) {
    total += cartItems[i].item.price * (cartItems[i].count -promotioncount[i]);
  }
  return total;
}

function getpromotions(cartItems) {

  var promotions = 0 ;
  for(var i = 0; i < cartItems.length; i++) {
    promotions += cartItems[i].item.price * cartItems[i].count;
  }
  return promotions;
}
