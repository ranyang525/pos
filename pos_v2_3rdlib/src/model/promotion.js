function Promotion(type,barcodes) {
    this.type = type;
    this.barcodes = barcodes || [];
}

// Promotion.prototpye.setpromotion = function (cartItems) {
//   var promotions = loadPromotions();
//   var promotionText = this.promotionText;
//   for(var i = 0; i < cartItems.length; i++) {
//     for(var j = 0; j < promotions[0].barcodes.length; j++) {
//       if(cartItem.item.barcode === promotions[0].barcodes[j]) {
//         promotionText += '名称：' + cartItem.item.name +
//                          '，数量：' + Math.floor(cartItem.count/3) + cartItem.item.unit + '\n';
//       }
//     }
//   }
// }
//
// Promotion.prototpye.getpromotion = function (cartItems) {
//   return this.promotionText;
// }
