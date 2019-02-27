let cart = [];  // Creates shopping cart array

const viewCartButton = document.getElementsByClassName('view-cart')[0];
const shoppingCart = document.getElementsByClassName('shopping-cart')[0];

// Toggles the cart to show or not show when shopping cart button is pushed
viewCartButton.addEventListener('click', function () {
  if(shoppingCart.classList.contains('show')) {
    shoppingCart.classList = 'shopping-cart';
  } else {
    shoppingCart.className += ' show';
  }
});

const products = document.getElementsByClassName('products')[0];

products.addEventListener('click', function (e) { 
  // If Add To Cart Button is pushed check if its already in cart and increments QTY otherwise adds item to cart 
  if(e.target.classList.contains('add-to-cart')) {
    let alreadyInCart = cart.some(item => item.name === e.target.closest('.item').getAttribute('data-name'));
    if(alreadyInCart) {
      cart = cart.map(item => {
        if(item.name === e.target.closest('.item').getAttribute('data-name')) {
          item.qty += 1;
        } return item;
      });
    } else {
    cart.push({name: e.target.closest('.item').getAttribute('data-name'), price: e.target.closest('.item').getAttribute('data-price'), qty: 1});
    }
    renderCart();

    // If clear cart button is clicked clears the entire cart
  } else if(e.target.classList.contains('clear-cart')) {
    document.getElementsByClassName('cart-list')[0].innerHTML = '';
    document.getElementsByClassName('total')[0].innerHTML = 0;
    cart = [];

    // Delete item button is clicked in cart list removes that item from cart
  } else if(e.target.classList.contains('delete')) {
    cart = cart.filter(item => item.name !== e.target.parentElement.getAttribute('data-name'));
    renderCart();
  } 
});

// Builds the html for the shopping cart list and outputs it to the DOM
const renderCart = function() {
  let html = '';
  for(let i = 0; i < cart.length; i++) {
    html += '<div data-name=' + '"' + cart[i].name + '"' + '>' + cart[i].name + ' (' + cart[i].qty + ')' + ' - $' 
    + (cart[i].price * cart[i].qty) + '  ' + '<input type="image" src="redx.png" class="delete">' + '</div>';
  }
  document.getElementsByClassName('cart-list')[0].innerHTML = html;
  totalCart();
}

// Calculates the total of all items in your cart and outputs it to the DOM
const totalCart = function() {
  let total = [];
  cart.forEach(function(obj) {
    total.push(parseInt(obj.price * obj.qty));
  });
  document.getElementsByClassName('total')[0].innerHTML = total.reduce(((a, b) => a + b), 0);
}