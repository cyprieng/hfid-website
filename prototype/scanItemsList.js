function scannedItem(itemName, price, quantity, produce) {
    this.itemName = itemName;
    this.price = price;
    this.quantity = quantity;
    this.produce = produce;
}

scannedItems = [
	new scannedItem("Lucky Charms", 5, 1, false),
	new scannedItem("Grain Bread", 1, 7, false),
	new scannedItem("Oranges", 1.99, 1, true),
	new scannedItem("Frosted Flakes", 5, 1, false),
	new scannedItem("Lettuce", 1, 7, true),
	new scannedItem("Peanut Butter", 1.99, 1, false),
	new scannedItem("Organic Milk", 5, 1, false),
	new scannedItem("Milano Cookies", 5, 1, false),
	new scannedItem("Apples", 1.99, 1, true),
	new scannedItem("Blackberry Jam", 5, 1, false),
	new scannedItem("Strawberries", 1, 3, false)
]

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

function addItemToTable(item) {
	var newItem =   '<tr>\
                         <td>'+item.itemName+'</td>\
                         <td>'+priceToString(item.price)+'</td>\
                         <td>'+String(item.quantity)+'</td>\
                         <td>'+priceToString(item.price * item.quantity)+'</td>\
                         <td><button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#return_bin"><span class="glyphicon glyphicon-remove"></span></button></td>\
                     </tr>'
	$(newItem).appendTo("#items-table-body")
}

$(document).ready(function () {
	for (i = 0; i < scannedItems.length; i++) {
		item = scannedItems[i]
		addItemToTable(item)

	}
})