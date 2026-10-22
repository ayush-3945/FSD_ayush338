const productsGrid = document.getElementById("productsGrid");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");

let cart = [];

const fetchProducts = async () => {
    try {
        const res = await fetch("https://dummyjson.com/products?limit=8");
        const data = await res.json();
        renderProducts(data.products);
    } catch (err) {
        productsGrid.innerHTML = `<p class="error">Failed to load products. Check your network.</p>`;
    }
};

const renderProducts = (products) => {
    productsGrid.innerHTML = "";
    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.thumbnail}')">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
};

window.addToCart = (id, title, price, thumbnail) => {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, title, price, thumbnail, quantity: 1 });
    }
    updateCartUI();
};

window.changeQuantity = (id, change) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== id);
    }
    updateCartUI();
};

window.removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    updateCartUI();
};

const updateCartUI = () => {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
        cartCount.innerText = "0";
        totalPrice.innerText = "0.00";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="cart-thumb">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price} x ${item.quantity} = <strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="del-btn" onclick="removeFromCart(${item.id})">&times;</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = count;
    totalPrice.innerText = total.toFixed(2);
};

fetchProducts();
