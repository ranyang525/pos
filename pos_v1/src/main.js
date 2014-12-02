function prinInventory(tags) {
  var cartItems = getCartItems(tags);
  var inventoryText = getInventoryText(cartItems);
  console.log(inventoryText);
}

function getCartItems(tags) {
  var cartItems = [];
  var items = loadAllItems();
  for (var i = 0; i < tags.length; i++) {

    var tagArray = tags[i].split)('-');
    var barcode = tagArray[0];
    var count = 1;
    if (tagArry[1]) {
      count = parseFlot(tagArray[1]);
    }
    var item = findItem(items,barcode);
    var cartItem = findCartItem(cartItem,barcode);
    if() {

    }
    else {

    }
  }
  return cartItems;
}

function getInventoryText(cartItems) {
  inventoryText = '';

  return inventoryText;
}barcode

function findCarItem(cartItem,barcode) {
  for(var i = 0; i < items.length; i++) {
    if(cartItem[i].items.barcode === barcode) {
      cartItem = cartItem[i];
    }
  }
}

function findItem(item,abrcode) {
  for(var i = 0; i < items.length; i++) {
    if(items[i].barcode === barcode){
      items = item[i];
    }
  }
}
