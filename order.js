document.addEventListener('DOMContentLoaded', function() {
    // Сохранение данных в localStorage
    function saveFormData() {
        const formData = {
            flowerType: document.getElementById('flower-type').value,
            flowerCount: document.getElementById('flower-count').value,
            bouquetName: document.getElementById('bouquet-name').value,
            customerName: document.getElementById('customer-name').value,
            customerPhone: document.getElementById('customer-phone').value,
            deliveryType: document.querySelector('.delivery-toggle button.active').dataset.type,
            pickupAddress: document.querySelector('.pickup-point.selected')?.dataset.address,
            pickupTime: document.getElementById('pickup-time').value,
            deliveryAddress: document.getElementById('delivery-address').value,
            deliveryTime: document.getElementById('delivery-time').value,
            recipientName: document.getElementById('recipient-name').value,
            recipientPhone: document.getElementById('recipient-phone').value,
            cardText: document.getElementById('card-text').value,
            paymentMethod: document.querySelector('input[name="payment"]:checked').value,
            agreement: document.getElementById('agreement').checked
        };
        
        localStorage.setItem('orderFormData', JSON.stringify(formData));
    }

    // Восстановление данных из localStorage
    function loadFormData() {
        const savedData = localStorage.getItem('orderFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            document.getElementById('flower-type').value = formData.flowerType;
            document.getElementById('flower-count').value = formData.flowerCount;
            document.getElementById('bouquet-name').value = formData.bouquetName;
            document.getElementById('customer-name').value = formData.customerName;
            document.getElementById('customer-phone').value = formData.customerPhone;
            
            // Восстановление типа доставки
            const deliveryButtons = document.querySelectorAll('.delivery-toggle button');
            deliveryButtons.forEach(button => {
                button.classList.remove('active');
                if (button.dataset.type === formData.deliveryType) {
                    button.classList.add('active');
                    toggleDeliveryFields(formData.deliveryType);
                }
            });
            
            // Восстановление пункта самовывоза
            if (formData.pickupAddress) {
                const pickupPoints = document.querySelectorAll('.pickup-point');
                pickupPoints.forEach(point => {
                    point.classList.remove('selected');
                    if (point.dataset.address === formData.pickupAddress) {
                        point.classList.add('selected');
                    }
                });
            }
            
            document.getElementById('pickup-time').value = formData.pickupTime;
            document.getElementById('delivery-address').value = formData.deliveryAddress;
            document.getElementById('delivery-time').value = formData.deliveryTime;
            document.getElementById('recipient-name').value = formData.recipientName;
            document.getElementById('recipient-phone').value = formData.recipientPhone;
            document.getElementById('card-text').value = formData.cardText;
            
            // Восстановление способа оплаты
            document.querySelector(`input[name="payment"][value="${formData.paymentMethod}"]`).checked = true;
            document.getElementById('agreement').checked = formData.agreement;
            
            // Пересчет цены
            calculatePrice();
        }
    }

    // Переключение между полями доставки и самовывоза
    function toggleDeliveryFields(type) {
        const pickupFields = document.getElementById('pickup-fields');
        const deliveryFields = document.getElementById('delivery-fields');
        
        if (type === 'pickup') {
            pickupFields.style.display = 'block';
            deliveryFields.classList.remove('active');
        } else {
            pickupFields.style.display = 'none';
            deliveryFields.classList.add('active');
        }
    }

    // Инициализация страницы
    const deliveryButtons = document.querySelectorAll('.delivery-toggle button');
    const pickupPoints = document.querySelectorAll('.pickup-point');
    const modal = document.getElementById('contract-modal');
    const showContract = document.getElementById('show-contract');
    const closeModal = document.querySelector('.close-modal');
    const flowerType = document.getElementById('flower-type');
    const flowerCount = document.getElementById('flower-count');
    const bouquetName = document.getElementById('bouquet-name');
    const bouquetPrice = document.getElementById('bouquet-price');
    const totalPrice = document.getElementById('total-price');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Цены для разных типов и количеств цветов
    const prices = {
        'roses': {21: 165, 51: 357, 101:707 , 1001: 7007, 2001: 14007},
        'peony': {21: 180, 51: 440, 101: 860, 1001: 8510, 2001: 17010},
        'tulip': {21: 63, 51: 153, 101: 303, 1001: 3003, 2001: 6003},
        'lily': {21: 168, 51: 408, 101: 808, 1001: 8008, 2001: 16008},
        'pions': {21: 150, 51: 350, 101: 750, 1001: 7500, 2001: 14500},
        'ranunculus': {21: 210, 51: 510, 101: 1010, 1001: 10010, 2001: 20010},
        'orchids': {21: 210, 51: 510, 101: 1010, 1001: 10010, 2001: 20010},
        'chrysanthemums': {21: 168, 51: 408, 101: 808, 1001: 8008, 2001: 16008},
        'hydrangeas': {21: 150, 51: 350, 101: 750, 1001: 7500, 2001: 14500},
    };
    
    // Расчет цены
    function calculatePrice() {
        const type = flowerType.value;
        const count = flowerCount.value;
        const price = prices[type][count];
        
        bouquetPrice.textContent = price.toFixed(2) + ' BYN';
        totalPrice.textContent = price.toFixed(2) + ' BYN';
        
        // Автоматическое название букета
        const flowerNames = {
            'roses': 'Розы',
            'peony': 'Пионовидные розы',
            'tulip': 'Тюльпаны',
            'lily': 'Лилии',
            'pions': 'Пионы',
            'ranunculus': 'Ранункулюсы',
            'hydrangeas': 'Гортензии',
            'orchids': 'Орхидеи',
            'chrysanthemums': 'Хризантемы'
        };
        
        bouquetName.value = `${flowerNames[type]} ${count}`;
    }
    
    // Обработчики событий
    deliveryButtons.forEach(button => {
        button.addEventListener('click', () => {
            deliveryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            toggleDeliveryFields(button.dataset.type);
            saveFormData();
        });
    });
    
    pickupPoints.forEach(point => {
        point.addEventListener('click', () => {
            pickupPoints.forEach(p => p.classList.remove('selected'));
            point.classList.add('selected');
            saveFormData();
        });
    });
    
    showContract.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    flowerType.addEventListener('change', () => {
        calculatePrice();
        saveFormData();
    });
    
    flowerCount.addEventListener('change', () => {
        calculatePrice();
        saveFormData();
    });
    
    // Сохранение данных при изменении полей формы
    document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('change', saveFormData);
        element.addEventListener('input', saveFormData);
    });
    
    document.getElementById('agreement').addEventListener('change', saveFormData);
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const agreement = document.getElementById('agreement').checked;
        
        if (!agreement) {
            alert('Пожалуйста, подтвердите согласие с условиями договора');
            return;
        }
        
        const isDelivery = document.querySelector('.delivery-toggle button.active').dataset.type === 'delivery';
        const requiredFields = isDelivery 
            ? ['#delivery-fields input[required], #delivery-fields textarea[required]']
            : ['#pickup-fields input[required]'];
        
        let isValid = true;
        requiredFields.forEach(selector => {
            document.querySelectorAll(selector).forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
        });
        
        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        alert('Ваш заказ успешно оформлен! Спасибо за покупку.');
        localStorage.removeItem('orderFormData');
    });
    
    // Загрузка сохраненных данных при загрузке страницы
    loadFormData();
    
    // Инициализация расчета цены
    calculatePrice();
});