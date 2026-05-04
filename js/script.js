console.log('JS подключен');
const buttons = document.querySelectorAll('.buy-btn'); 
const cartCount = document.querySelector('#cart-count');
const headerCartCount = document.querySelector('#header-cart-count');
const cartTotal = document.querySelector('#cart-total');
const cartItems = document.querySelector('#cart-items');
const clearCartBtn = document.querySelector('#clear-cart-btn');

const cart = [];

function renderCart() {
    // Считаем общее количество товаров (сумма quantity)
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);
    cartCount.textContent = totalItems;
    headerCartCount.textContent = totalItems;
    
    // Считаем общую стоимость
    let total = 0;
    
    // Очищаем список корзины
    cartItems.innerHTML = '';

    // Для каждого товара в корзине создаём элемент списка
    cart.forEach(function(item, index) {
        total += item.price * item.quantity;
        
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} — ${item.price * item.quantity} руб. `;
        
        // Создаём НОВУЮ кнопку для этого конкретного товара
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.backgroundColor = '#ff4d4f';
        deleteBtn.onclick = () => {
            // Удаляем товар по индексу
            cart.splice(index, 1);
            renderCart(); // Перерисовываем корзину
        };
        
        li.appendChild(deleteBtn);
        cartItems.appendChild(li);
    });
    
    cartTotal.textContent = total;
}

// Добавление товара по кнопке "Купить"
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const existing = cart.find(item => item.name === name);
        
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        
        renderCart();
    });
});

// Очистка всей корзины
clearCartBtn.addEventListener('click', function() {
    cart.length = 0; 
    renderCart();
});