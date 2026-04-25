console.log('JS подключен');
const buttons = document.querySelectorAll('.buy-btn'); 
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const cartItems = document.querySelector('#cart-items');

const cart = [];

function renderCart() {
    cartCount.textContent = cart.length;
    
    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach(function(item) {
        total += item.price;

        const li = document.createElement('li');
        li.textContent = item.name + ' - ' + item.price + ' руб.';
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total;
}

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cart.push({
            name: name, 
            price: price 
        });

        cartCount.textContent = cart.length;

        renderCart();
    });
});