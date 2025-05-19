const flowerPrices = {
    roses: {21: 165, 51: 357, 101:707 , 1001: 7007, 2001: 14007},
    peony: {21: 180, 51: 440, 101: 860, 1001: 8510, 2001: 17010},
    tulip: {21: 63, 51: 153, 101: 303, 1001: 3003, 2001: 6003},
    lily: {21: 168, 51: 408, 101: 808, 1001: 8008, 2001: 16008},
    pions: {21: 150, 51: 350, 101: 750, 1001: 7500, 2001: 14500},
    ranunculus: {21: 210, 51: 510, 101: 1010, 1001: 10010, 2001: 20010},
    hydrangea: {21: 231, 51: 561, 101: 1111, 1001: 11011, 2001: 22011},
    chrysanthemum: {21: 126, 51: 306, 101: 606, 1001: 6006, 2001: 12006},
    orchid: {21: 315, 51: 765, 101: 1515, 1001: 15015, 2001: 30015}
};

const products = [
    { 
        id: 1, 
        name: 'Нежные Тюльпаны', 
        price: flowerPrices.tulip[21], 
        category: 'tulip', 
        image: 'image/photo_2025-04-04_01-54-41.jpg',
        priceOptions: flowerPrices.tulip,
        description: 'Свежие тюльпаны разных оттенков, собранные в элегантный букет'
    },
    { 
        id: 2, 
        name: 'Королевские Лилии', 
        price: flowerPrices.lily[21], 
        category: 'lily', 
        image: 'image/photo_2025-04-04_01-54-52.jpg',
        priceOptions: flowerPrices.lily,
        description: 'Ароматные лилии с крупными бутонами для особых моментов'
    },
    { 
        id: 3, 
        name: 'Пышные Пионы', 
        price: flowerPrices.pions[21], 
        category: 'pions', 
        image: 'image/photo_2025-04-04_01-54-21.jpg',
        priceOptions: flowerPrices.pions,
        description: 'Роскошные пионы с нежными лепестками и тонким ароматом'
    },
    { 
        id: 4, 
        name: 'Изысканные Ранункулюсы', 
        price: flowerPrices.ranunculus[21], 
        category: 'ranunculus', 
        image: 'image/photo_2025-04-29_14-07-02.jpg',
        priceOptions: flowerPrices.ranunculus,
        description: 'Утонченные ранункулюсы с многослойными лепестками'
    },
    { 
        id: 5, 
        name: 'Классические Розы', 
        price: flowerPrices.roses[51], 
        category: 'roses', 
        image: 'image/photo_2025-04-04_01-54-57.jpg',
        priceOptions: flowerPrices.roses,
        description: 'Свежие розы премиум-класса в различных цветовых решениях'
    },
    { 
        id: 6, 
        name: 'Воздушные Гортензии', 
        price: flowerPrices.hydrangea[21], 
        category: 'hydrangea', 
        image: 'image/photo_2025-04-29_14-07-12.jpg',
        priceOptions: flowerPrices.hydrangea,
        description: 'Пышные соцветия гортензий для создания объемных композиций'
    },
    { 
        id: 7, 
        name: 'Яркие Хризантемы', 
        price: flowerPrices.chrysanthemum[21], 
        category: 'chrysanthemum', 
        image: 'image/photo_2025-04-29_19-31-00.jpg',
        priceOptions: flowerPrices.chrysanthemum,
        description: 'Долгостоящие хризантемы в богатой цветовой палитре'
    },
    { 
        id: 8, 
        name: 'Экзотические Орхидеи', 
        price: flowerPrices.orchid[21], 
        category: 'orchid', 
        image: 'image/photo_2025-04-29_14-06-50.jpg',
        priceOptions: flowerPrices.orchid,
        description: 'Утонченные орхидеи для изысканных интерьеров и подарков'
    },
    { 
        id: 9, 
        name: 'Эксклюзивный Смешанный Букет', 
        category: 'mixed', 
        image: 'image/photo_2025-04-29_14-06-25.jpg',
        description: 'Авторская композиция из сезонных цветов, созданная нашими флористами, цену стоит уточнить',
        badge: 'Эксклюзив'
    }
];

function renderProducts(category = 'all') {
    const catalogItems = document.querySelector('.catalog__items');
    catalogItems.innerHTML = '';
    catalogItems.style.display = 'grid';
    catalogItems.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    catalogItems.style.gap = '35px';
    
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-card__image">
                ${product.badge ? `<div class="product-card__badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__description">${product.description}</p>
                ${product.price ? `<div class="product-card__price">${product.price} р</div>` : ''}
                ${product.priceOptions ? `<div class="product-card__price-options">${Object.entries(product.priceOptions).map(([k,v]) => `${k} шт. - ${v}р`).join(' | ')}</div>` : ''}
                <button class="product-card__btn">В корзину</button>
            </div>
        `;
        
        card.querySelector('.product-card__btn').addEventListener('click', function() {
            // Сохраняем выбранный товар в localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            
            // Изменяем вид кнопки на короткое время
            this.textContent = 'Добавлено ✓';
            this.style.backgroundColor = '#4CAF50';
            
            // Перенаправляем на страницу заказа после небольшой задержки
            setTimeout(() => {
                window.location.href = 'order.html';
            }, 500);
        });
        
        catalogItems.appendChild(card);
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.dataset.category);
    });
});

renderProducts();