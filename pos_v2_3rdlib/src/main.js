function printInventory(tags) {
  var cart = new CartItem();
  cart.setcartItems(tags);
  // var inventoryText = getInventoryText(cart.getcartItems());
  // console.log(inventoryText);
  var inventory = new Inventory(cart);
  console.log(inventory.toString());
}

function getInventoryText(cartItems) {
  var inventoryText = '';
  var total = getTotal (cartItems);
  var promotions = getpromotions(cartItems);
  var cartItemText = getCartItemsText(cartItems);
  var promotionText = getPromotionText(cartItems);
  var summaryText = getSummaryText(cartItems,total,promotions);
  dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
  };
  var currentDate = new Date(),
      year = dateDigitToString(currentDate.getFullYear()),
      month = dateDigitToString(currentDate.getMonth() + 1),
      date = dateDigitToString(currentDate.getDate()),
      hour = dateDigitToString(currentDate.getHours()),
      minute = dateDigitToString(currentDate.getMinutes()),
      second = dateDigitToString(currentDate.getSeconds()),
      formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  var text =
  '***<没钱赚商店>购物清单***\n' +
  '打印时间：' + formattedDateString + '\n' +
  '----------------------\n' +  cartItemText +
  '----------------------\n' + '挥泪赠送商品：\n' +promotionText +
  '----------------------\n' + summaryText +
  '**********************';
  return text;
}

// function getCartItemsText(cartItems) {
//
//   var promotioncount = getPromotioncount(cartItems);
//   var cartItemText = '';
//
//   _.forEach(cartItems,function(cartItem, index) {
//     var item = cartItem.item;
//     var actual = cartItem.count - promotioncount[index];
//
//     cartItemText += '名称：' + item.name +
//     '，数量：' + cartItem.count +item.unit +
//     '，单价：' + item.price.toFixed(2) + '(元)' +
//     '，小计：' + (item.price * actual).toFixed(2) +'(元)\n';
//
//   });
//   return cartItemText;
// }

// function getPromotionText(cartItems) {
//
//   var promotions = loadPromotions();
//   var promotionText = '';
//
//   for(var i = 0; i < cartItems.length; i++) {
//     promotionText += findPromotion(cartItems[i], promotions);
//
//   }
//   return promotionText;
// }
//
// function findPromotion(cartItem, promotions) {
//   var promotionText = '';
//   for(var j = 0; j < promotions[0].barcodes.length; j++) {
//
//     if(cartItem.item.barcode === promotions[0].barcodes[j]) {
//       promotionText += '名称：' + cartItem.item.name +
//       '，数量：' + Math.floor(cartItem.count/3) + cartItem.item.unit + '\n';
//     }
//   }
//   return promotionText;
// }

// function getSummaryText(cartItems,total,promotions) {
//
//   var summaryText = '';
//
//   for(var i = 0; i < cartItems.length; i++) {
//     summaryText = '总计：' + total.toFixed(2) + '(元)\n' +
//     '节省：' + (promotions - total).toFixed(2) + '(元)\n';
//   }
//   return summaryText;
// }
//
// function getPromotioncount(cartItems) {
//   var promotions = loadPromotions();
//   var promotioncount = [];
//
//   for(var i = 0; i < cartItems.length; i++) {
//
//     findPromotioncount(promotions[0], cartItems[i], promotioncount);
//   }
//   return promotioncount;
// }
//
// function findPromotioncount(promotion, cartItem, promotioncount) {
//   for(var j = 0; j < promotion.barcodes.length; j++) {
//
//     if(cartItem.item.barcode === promotion.barcodes[j]) {
//       promotioncount.push(0);
//     } else {
//       promotioncount.push(Math.floor(cartItem.count/3));
//     }
//   }
// }
//
// function getTotal(cartItems) {
//
//   var total = 0 ;
//   var promotioncount = getPromotioncount(cartItems);
//
//   for(var i = 0; i < cartItems.length; i++) {
//     total += cartItems[i].item.price * (cartItems[i].count -promotioncount[i]);
//   }
//   return total;
// }
//
// function getpromotions(cartItems) {
//
//   var promotions = 0 ;
//   for(var i = 0; i < cartItems.length; i++) {
//     promotions += cartItems[i].item.price * cartItems[i].count;
//   }
//   return promotions;
// }
