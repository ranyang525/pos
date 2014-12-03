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
  var number = getNumber(cartItems);
  var cartItemText = '';
  for(var i = 0; i < cartItems.length; i++){
    cartItemText += '名称：' + cartItems[i].item.name +
                    '，数量：' + cartItems[i].count + cartItems[i].item.unit +
                    '，单价：' + (cartItems[i].item.price).toFixed(2) + '(元)' +
                    '，小计：' + (cartItems[i].item.price * (cartItems[i].count -number[i])).toFixed(2) +'(元)\n';
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

function getNumber(cartItems) {
  var promitions = loadPromotions();
  var number = [];
  for(var i = 0; i < cartItems.length; i++) {
    for(var j = 0; j < promitions[0].barcodes.length; j++) {
      if(cartItems[i].item.barcode === promitions[0].barcodes[j]) {
        number.push(0)
      } else
        {
          number.push(Math.floor(cartItems[i].count/3))
        }
    }
  }
  return number;
}

function getSum(cartItems) {
  var sum = 0 ;
  var number = getNumber(cartItems);
  for(var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].item.price * (cartItems[i].count -number[i]);
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

//
// function getgetPromotionCount(){
//   var promitions = loadPromotions();
//   var promotionText = '';
//   for(var i = 0; i < cartItems.length; i++) {
//     for(var j = 0; j < promitions[0].barcodes.length; j++) {
//
//     }
//   }
// }








// cartItems[i].price.toFixed(2) * (cartItems[i].count-Math.floor(cartItems[i].count/3))
