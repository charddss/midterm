const products = [
    { "id": 1, "name": "Laptop", "price": 10.00, "stock": 5, "image": "laptop.png" },
    { "id": 2, "name": "Headphones", "price": 15.00, "stock": 10, "image": "headphones.png" },
    { "id": 3, "name": "Keyboard", "price": 20.00, "stock": 20, "image": "keyboard.png" }
];

function displayProducts() {
    const container = document.getElementById('product-container');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 product-card';

        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <p class="stock-info" id="stock-${product.id}">
                        ${product.stock > 0 ? `In stock: ${product.stock}` : '<span class="out-of-stock">Out of stock</span>'}
                    </p>
                    <a href="#" id="btn-${product.id}" class="btn btn-primary ${product.stock === 0 ? 'disabled' : ''}" onclick="addToCart(${product.id})">Add to Cart</a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function addToCart(productId) {
   
    const product = products.find(p => p.id === productId);

 
    if (product.stock > 0) {
        product.stock -= 1;

       
        const stockInfo = document.getElementById(`stock-${product.id}`);
        stockInfo.innerHTML = product.stock > 0 ? `In stock: ${product.stock}` : '<span class="out-of-stock">Out of stock</span>';

      
        if (product.stock === 0) {
            const addButton = document.getElementById(`btn-${product.id}`);
            addButton.classList.add('disabled');
            addButton.setAttribute('disabled', 'true');
        }

     
        showToast(product.name);
    }
}


function showToast(productName) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-success border-0';
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${productName} has been added to your cart!
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();

   
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}


displayProducts();
