/* Checking if the page is downloading or not */
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItemsButtons = document.getElementsByClassName('btn-danger');
    console.log(removeCartItemsButtons);
    for (var i = 0; i < removeCartItemsButtons.length; i++) {
        var button = removeCartItemsButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('btn-add');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if(!cartItems.hasChildNodes()) {
        alert('Your cart is empty.')
    } else {
        let order_total = document.getElementsByClassName('cart-total-price')[0].innerHTML;
        document.getElementById("total").value = order_total;
        console.log("Total: " + order_total);

        let order_items = [];
        alert('Thank you for your purchase!');
        let i = 0;

        while(cartItems.hasChildNodes()) {
            order_items[i] = [cartItems.getElementsByClassName("cart-item")[0].innerText, cartItems.getElementsByClassName('cart-price')[0].innerText, cartItems.getElementsByClassName('cart-quantity-input')[0].value];

            let orderRow = document.createElement("div");
            orderRow.classList.add("order-row"); // Adding the class name 'order-row'

            let orderItems = document.getElementById("formToOrder");

            let orderRowContents = `
                <input type="text" class="title" id="title" name="items[${i}][title]">
                <input type="text" class="price" id="price" name="items[${i}][price]">
                <input type="text" class="quantity" id="quantity" name="items[${i}][quantity]">`
            orderRow.innerHTML = orderRowContents;
            orderItems.append(orderRow); // Adds 'order-row' to the end of 'order-items'

            document.getElementsByClassName("title")[i].value = order_items[i][0];
            document.getElementsByClassName("price")[i].value = order_items[i][1];
            document.getElementsByClassName("quantity")[i].value = order_items[i][2];

            var cartItems = document.getElementsByClassName("cart-items")[0];
            cartItems.removeChild(cartItems.firstChild);
            i++;
            console.table(order_items);
        }
        updateCartTotal();
    }
}

// A function that removes items from the cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// A function that checks if the quantity of the inputed item is a number or less than one
function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) { // Not a Number
        input.value = 1;
    }
    updateCartTotal();
}

// A function that reads the name of the menu item and the price
function addToCartClicked(event) {
    var button = event.target;
    var menuItem = button.parentElement.parentElement;
    var title = menuItem.getElementsByClassName('menu-item-title')[0].innerText;
    var price = menuItem.getElementsByClassName('menu-item-price')[0].innerText;
    // var imageSrc = menuItem.getElementsByClassName('menu-item-image')[0].src;
    console.log(title, price); // console.log(title, price, image);
    addItemToCart(title, price); // addItemToCart(title, price, image);
    updateCartTotal();
}

// A function that creates new rows in the cart
function addItemToCart(title, price) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row'); // Adding the class name 'cart-row'
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item');
    for (var i = 0; i < cartItemNames.length; i++) { // Checks if there is an item in the cart
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `
        <span class="cart-item cart-column">${title}</span>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow); // Adds 'cart-row' to the end of 'cart-items'
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem); // Makes remove button work
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged); // Makes input work
}

// A function to update the total value
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        console.log(priceElement, quantityElement);
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += (price * quantity);
    }
    total = Math.round(total * 100) / 100; // Leaves only two digits after the dot
    if(total % total == 0) {
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total + '.00';
    } else {
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
    }
}