let cart = [];

function addToCart(ProductName, productPriceString) {
    const productPrice = +productPriceString.replace("Price: $", "");
    cart[ProductName] = cart[ProductName] || { price: productPrice, quantity: 0 };
    cart[ProductName].quantity += 1;

    alert(`${ProductName} has been added to the cart.`);

    updateCartDisplay();
}

function removeFromCart(ProductName) {
    cart[ProductName].quantity -= 1;
    if (cart[ProductName].quantity === 0) {
        delete cart[ProductName];
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById("cart-section");
    cartDisplay.innerHTML = "";

    const displayTitle = document.createElement("h2");
    displayTitle.textContent = "Shopping Cart";
    displayTitle.style.textAlign = "center";
    cartDisplay.appendChild(displayTitle);

    for (let ProductName in cart) {
        const product = cart[ProductName];

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${ProductName} - ${product.price} - ${product.quantity} <button class="remove-button">Remove</button></p>
        `;

        const removeButton = cartItem.querySelector(".remove-button");
        removeButton.addEventListener("click", () => removeFromCart(ProductName));
        cartDisplay.appendChild(cartItem);
    }
}

const addToCartButtons = document.querySelectorAll(".product button");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const productCard = this.closest(".product");
        const ProductName = productCard.querySelector("h1").innerText;
        const productPriceString = productCard.querySelector("p").innerText;
        addToCart(ProductName, productPriceString);
    });
});

updateCartDisplay();
