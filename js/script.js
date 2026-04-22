console.log('JS подключен');
const buttons = document.querySelectorAll('.buy-btn'); 
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const cartItems = document.querySelector('#cart-items');

const cart = [];

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cart.push({ name: name, price: price });

        cartCount.textContent = cart.length;

        let total = 0;
        cart.forEach(function(item) {
            total += item.price;
        });

        cartTotal.textContent = total;

        const li = document.createElement('li');
        li.textContent = name + ' - ' + price + ' руб.';
        cartItems.appendChild(li);
    });
});