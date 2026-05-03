console.log('JS подключен');
const buttons = document.querySelectorAll('.buy-btn'); 
const cartCount = document.querySelector('#cart-count');
const headerCartCount = document.querySelector('#header-cart-count');
const cartTotal = document.querySelector('#cart-total');
const cartItems = document.querySelector('#cart-items');
const clearCartBtn = document.querySelector('#clear-cart-btn');

const cart = [];

function renderCart() {
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);
    cartCount.textContent = totalItems;
    headerCartCount.textContent = totalItems;
    
    let total = 0;
    
    cartItems.innerHTML = '';

    cart.forEach(function(item) {
        total += item.price * item.quantity;
        
        const li = document.createElement('li');
        li.textContent = item.name + 'x' + item.quantity + ' - ' + item.price + ' руб.';
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total;
}

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1});
        }

        renderCart();
    });
});

clearCartBtn.addEventListener('click', function() {
    cart.length = 0; 
    renderCart();
});