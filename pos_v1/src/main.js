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
    var item = findItem(items, barcode);
    var cartItem = findCartItem(cartItems,barcode);
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
  var sum = getSum (cartItems);
  var prioromotions = getPrioromotions(cartItems,sum);
  var inventoryText = '';
  var cartItemText = getCartItemsText(cartItems)
  var promotionText = getPromotionText(cartItems);
  var summaryText = getSummaryText(cartItems,sum,prioromotions);
  var text =
  '***<没钱赚商店>购物清单***\n' + cartItemText +
  '----------------------\n' + '挥泪赠送商品：\n' +promotionText +
  '----------------------\n' + summaryText +
  '**********************';
  return text;
}

function findItem(items,barcode) {
  var item;
  for(var i = 0; i < items.length; i++) {
    if(items[i].barcode === barcode){
      item = items[i];
    }
  }
  return item;
}

function findCartItem(cartItems,barcode) {
  var cartItem;
  for(var i = 0; i < cartItems.length; i++) {
    if(cartItems[i].item.barcode === barcode) {
      cartItem = cartItems[i];
    }
  }
  return cartItem;
}

function getCartItemsText(cartItems) {

  var promotioncount = getPromotioncount(cartItems);
  var cartItemText = '';

  for(var i = 0; i < cartItems.length; i++){
    var cartItem = cartItems[i];
    var item = cartItem.item;
    var actual = cartItem.count -promotioncount[i];

    cartItemText += '名称：' + item.name +
                    '，数量：' + cartItem.count +item.unit +
                    '，单价：' + item.price.toFixed(2) + '(元)' +
                    '，小计：' + (item.price * actual).toFixed(2) +'(元)\n';

  }
  return cartItemText;
}

function getPromotionText(cartItems) {

  var promitions = loadPromotions();
  var promotionText = '';

  for(var i = 0; i < cartItems.length; i++) {

    for(var j = 0; j < promitions[0].barcodes.length; j++) {

      if(cartItems[i].item.barcode === promitions[0].barcodes[j]) {
        promotionText += '名称：' + cartItems[i].item.name +
                         '，数量：' + Math.floor(cartItems[i].count/3) + cartItems[i].item.unit + '\n';
      }
    }
  }
  return promotionText;
}

function getSummaryText(cartItems,sum,prioromotions) {

  var summaryText = '';

  for(var i = 0; i < cartItems.length; i++) {
    summaryText = '总计：' + sum.toFixed(2) + '(元)\n' +
                  '节省：' + (prioromotions - sum).toFixed(2) + '(元)\n';
  }
  return summaryText;
}

function getPromotioncount(cartItems) {

  var promitions = loadPromotions();
  var promotioncount = [];

  for(var i = 0; i < cartItems.length; i++) {

    for(var j = 0; j < promitions[0].barcodes.length; j++) {

      if(cartItems[i].item.barcode === promitions[0].barcodes[j]) {
        promotioncount.push(0)
      } else
        {
          promotioncount.push(Math.floor(cartItems[i].count/3))
        }
    }
  }
  return promotioncount;
}

function getSum(cartItems) {

  var sum = 0 ;
  var promotioncount = getPromotioncount(cartItems);

  for(var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].item.price * (cartItems[i].count -promotioncount[i]);
  }
  return sum;
}

function getPrioromotions(cartItems,sum) {

  var promitions = 0 ;
  for(var i = 0; i < cartItems.length; i++) {
    promitions += cartItems[i].item.price * cartItems[i].count;
  }
  return promitions;
}
