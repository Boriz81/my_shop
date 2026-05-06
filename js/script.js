console.log('JS подключен');
//const buttons = document.querySelectorAll('.buy-btn'); 
const cartCount = document.querySelector('#cart-count');
const headerCartCount = document.querySelector('#header-cart-count');
const cartTotal = document.querySelector('#cart-total');
const cartItems = document.querySelector('#cart-items');
const clearCartBtn = document.querySelector('#clear-cart-btn');

const cart = [];

const products = [
    {
        id: 1,
        name: "Наушники",
        price: 4900,
        description: "Удобные беспроводные наушники для музыки и работы.",
        image: "https://picsum.photos/300/200?random=1"
    },
    {
        id: 2,
        name: "Клавиатура",
        price: 2500,
        description: "Механическая клавиатура с подсветкой.",
        image: "https://picsum.photos/300/200?random=2"
    },
    {
        id: 3,
        name: "Мышь",
        price: 1500,
        description: "Эргономичная мышь с высокой точностью.",
        image: "https://picsum.photos/300/200?random=3"
    }
];

function renderProducts() {
    const container = document.querySelector('.products-gird');
    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
        const article = document.createElement('article');
        article.className = 'product-card';
        article.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="300" height="200" loading="lazy">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString()} ₽</p>
            <p>${product.description}</p>
            <button class="buy-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Купить</button>
            `;
            container.appendChild(article);
    });

    // После добавления товаров нужно обновить buttons
    const newButtons = document.querySelectorAll('.buy-btn');
    newButtons.forEach(button => {
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
}

loadCartFromLocalStorage(); // Загружаем корзину при загрузке страницы
renderProducts(); // Рендерим товары при загрузке страницы

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
    saveCartToLocalStorage(); // Сохраняем корзину при каждом обновлении
}

// Добавление товара по кнопке "Купить"
// buttons.forEach(function(button) {
//     button.addEventListener('click', function() {
//         const name = button.dataset.name;
//         const price = Number(button.dataset.price);
//         const existing = cart.find(item => item.name === name);
        
//         if (existing) {
//             existing.quantity += 1;
//         } else {
//             cart.push({ name, price, quantity: 1 });
//         }
        
//         renderCart();
//     });
// });

// Очистка всей корзины
clearCartBtn.addEventListener('click', function() {
    cart.length = 0; 
    renderCart();
});

// Сохраняем корзину в localStorage при изменении
function saveCartToLocalStorage() {
    localStorage.setItem('myShopCart', JSON.stringify(cart));
}
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('myShopCart');
    if (savedCart) {
        const loadedCart = JSON.parse(savedCart);
        cart.length = 0; // Очищаем текущую корзину
        loadedCart.forEach(item => cart.push(item));
        renderCart();
    }
}