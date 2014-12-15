function Promotion(type,barcodes) {
    this.type = type;
    this.barcodes = barcodes || [];
}

// Promotion.getTotal = function() {
//
//   var total = 0 ;
//   var promotioncount = CartItem.getPromotioncount(this.cartItems);
//
//   for(var i = 0; i < this.cartItems.length; i++) {
//     total += this.cartItems[i].item.price * (this.cartItems[i].count -promotioncount[i]);
//   }
//   return total;
// };
//
// Promotion.getpromotions = function() {
//
//   var promotions = 0 ;
//   for(var i = 0; i < this.cartItems.length; i++) {
//     promotions += this.cartItems[i].item.price * this.cartItems[i].count;
//   }
//   return promotions;
// };
