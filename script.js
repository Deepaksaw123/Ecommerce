// ============================
// PRODUCTS
// ============================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Casual T-Shirt",
        price: 799,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Leather Backpack",
        price: 1299,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Sunglasses",
        price: 699,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "Denim Jacket",
        price: 1799,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Sports Sneakers",
        price: 2299,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80"
    }

];


// ============================
// CART
// ============================

let cart = [];


// Load cart safely from LocalStorage
try {

    const savedCart =
        localStorage.getItem("shopEaseCart");

    if (savedCart) {

        const parsedCart =
            JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {

            cart = parsedCart;

        }

    }

} catch (error) {

    console.error(
        "Error loading cart:",
        error
    );

    cart = [];

}


// ============================
// DOM ELEMENTS
// ============================

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortFilter =
    document.getElementById("sortFilter");

const cartButton =
    document.getElementById("cartButton");

const cartElement =
    document.querySelector(".cart");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");


// ============================
// CHECK DOM ELEMENTS
// ============================

if (!productGrid) {
    console.error(
        "Error: #productGrid not found in HTML"
    );
}

if (!searchInput) {
    console.error(
        "Error: #searchInput not found in HTML"
    );
}

if (!categoryFilter) {
    console.error(
        "Error: #categoryFilter not found in HTML"
    );
}

if (!sortFilter) {
    console.error(
        "Error: #sortFilter not found in HTML"
    );
}

if (!cartButton) {
    console.error(
        "Error: #cartButton not found in HTML"
    );
}

if (!cartElement) {
    console.error(
        "Error: .cart not found in HTML"
    );
}

if (!cartOverlay) {
    console.error(
        "Error: #cartOverlay not found in HTML"
    );
}

if (!closeCart) {
    console.error(
        "Error: #closeCart not found in HTML"
    );
}

if (!cartItems) {
    console.error(
        "Error: #cartItems not found in HTML"
    );
}

if (!cartCount) {
    console.error(
        "Error: #cartCount not found in HTML"
    );
}

if (!cartTotal) {
    console.error(
        "Error: #cartTotal not found in HTML"
    );
}

if (!checkoutButton) {
    console.error(
        "Error: #checkoutButton not found in HTML"
    );
}


// ============================
// DISPLAY PRODUCTS
// ============================

function displayProducts(productList) {

    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = "";


    // No products
    if (productList.length === 0) {

        productGrid.innerHTML = `
            <div class="no-products">

                <h3>No Products Found</h3>

                <p>
                    Try another search or category.
                </p>

            </div>
        `;

        return;
    }


    // Display products
    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add(
            "product-card"
        );


        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


// ============================
// ADD TO CART
// ============================

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    // Product not found
    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;
    }


    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            category: product.category,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


// ============================
// UPDATE CART
// ============================

function updateCart() {

    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    let total = 0;

    let totalQuantity = 0;


    cart.forEach(item => {

        // Safety check
        if (
            typeof item.price !== "number" ||
            typeof item.quantity !== "number"
        ) {
            return;
        }


        total +=
            item.price * item.quantity;


        totalQuantity +=
            item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString("en-IN");

    }

}


// ============================
// CHANGE QUANTITY
// ============================

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            product =>
                product.id === productId
        );


    if (!item) {

        return;
    }


    item.quantity += change;


    // Remove if quantity becomes 0
    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== productId
            );

    }


    saveCart();

    updateCart();

}


// ============================
// REMOVE FROM CART
// ============================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

    updateCart();

}


// ============================
// SAVE CART
// ============================

function saveCart() {

    try {

        localStorage.setItem(
            "shopEaseCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Error saving cart:",
            error
        );

    }

}


// ============================
// SEARCH + FILTER + SORT
// ============================

function filterProducts() {

    if (
        !searchInput ||
        !categoryFilter ||
        !sortFilter
    ) {

        return;
    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const sort =
        sortFilter.value;


    let filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    // ============================
    // SORT BY PRICE LOW
    // ============================

    if (sort === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    // ============================
    // SORT BY PRICE HIGH
    // ============================

    else if (sort === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    // ============================
    // SORT BY NAME
    // ============================

    else if (sort === "name") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    displayProducts(
        filtered
    );

}


// ============================
// OPEN CART
// ============================

function openCart() {

    if (!cartElement || !cartOverlay) {

        return;
    }


    cartElement.classList.add(
        "active"
    );


    cartOverlay.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


// ============================
// CLOSE CART
// ============================

function closeCartPanel() {

    if (!cartElement || !cartOverlay) {

        return;
    }


    cartElement.classList.remove(
        "active"
    );


    cartOverlay.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


// ============================
// CART BUTTON
// ============================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


// ============================
// CLOSE BUTTON
// ============================

if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartPanel
    );

}


// ============================
// OVERLAY
// ============================

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartPanel
    );

}


// ============================
// SEARCH
// ============================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


// ============================
// CATEGORY FILTER
// ============================

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


// ============================
// SORT FILTER
// ============================

if (sortFilter) {

    sortFilter.addEventListener(
        "change",
        filterProducts
    );

}


// ============================
// CHECKOUT
// ============================

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;
            }


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


            alert(
                "Order placed successfully!\n\n" +
                "Total Amount: ₹" +
                total.toLocaleString("en-IN")
            );


            cart = [];


            saveCart();

            updateCart();

            closeCartPanel();

        }
    );

}


// ============================
// ESC KEY
// ============================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCartPanel();

        }

    }
);


// ============================
// INITIAL LOAD
// ============================

displayProducts(products);

updateCart();