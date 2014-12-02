function scannedItem(itemName, price, quantity, produce) {
    this.itemName = itemName;
    this.price = price;
    this.quantity = quantity;
    this.produce = produce;
}

function addItem(name, price, produce){
    scannedItems.push(new scannedItem(name, price, 1, produce));
    sessionStorage.setItem('listItems', $.toJSON(scannedItems));
    window.location.href = "scanItems.html";
}

function removeItem(id){
    scannedItems.splice(id,1);
    sessionStorage.setItem('listItems', $.toJSON(scannedItems));
    window.location.href = "scanItems.html";
}

if(sessionStorage.getItem('listItems') == null){
    scannedItems = [];
    sessionStorage.setItem('listItems', $.toJSON(scannedItems));
}
else
    scannedItems = $.evalJSON(sessionStorage.getItem('listItems'));

function getTotalPrice(scannedItems) {
	// Given a list of scanned items,
	// returns the total cost.
	// The cost of a given item is given by price x quantity.
	sum = 0
	for (i = 0; i < scannedItems.length; i++) {
		item = scannedItems[i]
		console.log(item.itemName)
		sum += item.price * item.quantity
		sum = Math.round(sum*100)/100
	}
	console.log(sum)
	return sum
}

function priceToString(price) {
	if (price != Math.round(price)) {
		return "$"+String(price)
	} else {
		return "$"+String(price)+".00"
	}
}

var nextAction = "";

function addItemToTable(item, id) {
	var newItem =   '<tr>\
                         <td>'+item.itemName+'</td>\
                         <td>'+priceToString(item.price)+'</td>\
                         <td>'+String(item.quantity)+'</td>\
                         <td>'+priceToString(item.price * item.quantity)+'</td>\
                         <td><button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#return_bin" onclick="nextAction=\'removeItem('+id+')\'"><span class="glyphicon glyphicon-remove"></span></button></td>\
                     </tr>'
	$(newItem).appendTo("#items-table-body")
}

function updatePrice(itemList) {
	var newPrice = getTotalPrice(itemList)
	$('.total-cost').text(priceToString(newPrice))
    $('.cost-text').text(priceToString(newPrice))
    $('.cost-text2').text(priceToString(newPrice))
}

$(document).ready(function () {
	for (i = 0; i < scannedItems.length; i++) {
		item = scannedItems[i]
		addItemToTable(item, i)
	}
	updatePrice(scannedItems)
})
