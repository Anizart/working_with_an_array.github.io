let products = [
    { id: 1, name: 'Laptop', price: 1200, description: 'A high-performance laptop for professionals' },
    { id: 2, name: 'Phone', price: 800, description: 'A flagship smartphone with a powerful camera' },
    { id: 3, name: 'Tablet', price: 500, description: 'A lightweight and versatile tablet for everyday use' },
    { id: 4, name: 'Smartwatch', price: 250, description: 'A stylish smartwatch with health tracking features' },
    { id: 5, name: 'Headphones', price: 150, description: 'Noise-cancelling wireless headphones' },
    { id: 6, name: 'Keyboard', price: 100, description: 'A mechanical keyboard with customizable backlighting' },
    { id: 7, name: 'Monitor', price: 300, description: 'A 27-inch 4K monitor for gaming and work' },
    { id: 8, name: 'Mouse', price: 50, description: 'A precision wireless mouse with ergonomic design' },
    { id: 9, name: 'Printer', price: 400, description: 'An all-in-one printer with wireless connectivity' },
    { id: 10, name: 'Router', price: 120, description: 'A high-speed WiFi router with wide coverage' },
    { id: 11, name: 'Speaker', price: 200, description: 'A portable Bluetooth speaker with rich sound' },
    { id: 12, name: 'Webcam', price: 80, description: 'A 1080p webcam with low-light correction' },
    { id: 13, name: 'SSD', price: 150, description: 'A fast 1TB solid-state drive for storage' },
    { id: 14, name: 'External Hard Drive', price: 100, description: 'A 2TB external hard drive for backups' },
    { id: 15, name: 'Game Console', price: 500, description: 'A next-gen console for immersive gaming' },
    { id: 16, name: 'Drone', price: 900, description: 'A professional drone with a 4K camera' },
    { id: 17, name: 'Camera', price: 1200, description: 'A DSLR camera with interchangeable lenses' },
    { id: 18, name: 'Fitness Tracker', price: 150, description: 'A compact fitness tracker with heart rate monitoring' },
    { id: 19, name: 'Projector', price: 700, description: 'A 4K projector for home theater setups' },
    { id: 20, name: 'VR Headset', price: 600, description: 'A virtual reality headset for immersive experiences' },
    { id: 21, name: 'Microphone', price: 180, description: 'A professional USB microphone for recording' },
    { id: 22, name: 'Docking Station', price: 250, description: 'A versatile docking station with multiple ports' },
    { id: 23, name: 'Power Bank', price: 40, description: 'A compact power bank with fast charging' },
    { id: 24, name: 'Smart Light', price: 70, description: 'A smart LED light bulb with app control' },
    { id: 25, name: 'E-Reader', price: 180, description: 'A lightweight e-reader with a glare-free screen' }
];

console.log(products);

//+ Добавление товара:
document.querySelector('[data-btn1]').addEventListener('click', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value,
          price = document.getElementById('productPrice').value,
          description = document.getElementById('productDescription').value;

    if (name && price && description) {
        addProduct(name, price, description);
        this.parentElement.reset(); // Получаю родителя( form ), если кнопка лежит непосретственно в forme
    } else {
        alert('Впишите полную информацию об товаре');
    }
});

//+ Удаление товара:
const btn1 = document.querySelector('[data-btn2]'),
      input = document.querySelector('#deleteProductId');

btn1.addEventListener('click', function(event) {
    event.preventDefault();

    const id = input.value,
          newArr = products.filter(obj => obj.id !== +id);

    products = newArr;

    console.log(newArr);

    this.parentElement.reset();
});

//+ Обновление товара:
document.querySelector('[data-btn3]').addEventListener('click', function(event) {
    event.preventDefault();

    updateProduct(products);

    this.parentElement.reset();
});

//+ Найти товар по названию:
const foundProduct = document.querySelector('#findProductName'),
      btn4 = document.querySelector('[data-btn4]');

btn4.addEventListener('click', function(e) {
    e.preventDefault();

    findProductByName(products);

    this.parentElement.reset();
});

//+ Отфильтровать товары по цене:
const btn5 = document.querySelector('[data-btn5]'),
      minPrises = document.querySelector('#filterMinPrice'),
      maxPrises = document.querySelector('#filterMaxPrice');

btn5.addEventListener('click', function(e) {
    e.preventDefault();

    console.log(filterByPrice(products, minPrises.value, maxPrises.value));

    this.parentElement.reset();
});

//+ Отсортировать товары по цене:
const btn6 = document.querySelector('[data-btn6]');

btn6.addEventListener('click', function(e) {    
    const pageElement = document.querySelector('.page');

    e.preventDefault();

    const filteredProducts = sortByPrice(products);

    let productHTML = '';
    
    filteredProducts.forEach(obj => {
        productHTML += `
        <div style="display: flex; gap: 15px">
            <div>
                ${obj.name}
            </div>
            <div>
                ${obj.price}¥
            </div>
        </div>
        `;
    });
    
    document.querySelector('#productList').innerHTML = productHTML;

    if (pageElement) {
        window.scrollTo({
            top: pageElement.offsetTop + pageElement.clientHeight,
            behavior: 'smooth'
        });
    }

    this.parentElement.reset();
});

//+ Общая стоимость товаров:
const btn7 = document.querySelector('[data-btn7]'),
      totalPrice = calculateTotalPrice(products);

btn7.addEventListener('click', function(e) {
    e.preventDefault();

    console.log(`Общая стоимость товаров: ${totalPrice}¥`);
});

//+ Товары по ключевому слову:
const btn8 = document.querySelector('[data-btn8]'),
      searchInput = document.getElementById('searchKeyword'),
      searchResults = document.createElement('div');

document.body.appendChild(searchResults);

btn8.addEventListener('click', function(e) {
    e.preventDefault();

    const keyword = searchInput.value.trim().toLowerCase(),
          filteredProducts = searchProducts(keyword);

    displayResults(filteredProducts);
});

//+ Функции:
//+ Добавление товара:
function addProduct(name, price, description) {
    const product = {
        id: products.length,
        name: name,
        price: price,
        description: description
    };

    products.push(product);
    
    console.log("Товар добавлен:", products);
    alert("Товар добавлен: " + JSON.stringify(product));
}

//+ Обновление товара:
function updateProduct(array) {
    const id = document.querySelector('#updateProductId').value,
          newName = document.querySelector('#updateProductName').value,
          newPrice = document.querySelector('#updateProductPrice').value,
          newDescription = document.querySelector('#updateProductDescription').value,
          btn2 = document.querySelector('[data-btn3]');

    array.find(obj => {
        if (obj.id == +id) {
            obj.name = newName;
            obj.price = newPrice;
            obj.description = newDescription;
        }
    });

    console.log(array);

    products = array;

    console.log(products);
}

//+ Найти товар по названию:
function findProductByName(array) {    
    const inputValue = foundProduct.value;

    if (inputValue) {
        const foundProduct = array.find(obj => obj.name === inputValue);        

        if (foundProduct) {
            alert(`Вот товар, который Вы искали: ${JSON.stringify(foundProduct)}`);
            console.log(foundProduct);
        } else {
            alert('Товар не найден');
        }
    } else {
        alert('Не оставляйте поле пустым');
    }
}

//+ Отфильтровать товары по цене:
function filterByPrice(array, minPrise, maxPrise) {
    return array.filter(obj => obj.price >= minPrise && obj.price <= maxPrise).sort((a, b) => a.price - b.price);
}

//+ Отсортировать товары по цене:
function sortByPrice(array) {
    return array.sort((a, b) => a.price - b.price);
}

//+ Общая стоимость товаров:
function calculateTotalPrice(array) {
    return array.reduce((total, product) => total + product.price, 0);
}

//+ Товары по ключевому слову:
function searchProducts(keyword) {
    if (!keyword) return []; // Если ключевое слово пустое, возвращаем пустой массив

    return products.filter(product => 
        product.name.toLowerCase().includes(keyword) || 
        product.description.toLowerCase().includes(keyword)
    );
}

function displayResults(results) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<p>Ничего не найдено.</p>';
        return;
    }

    const resultList = document.createElement('ul');
    results.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${product.name}</strong> - $${product.price}
            <p>${product.description}</p>
        `;
        resultList.appendChild(listItem);
    });

    searchResults.appendChild(resultList);
}