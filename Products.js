let cart = {};

function addToCart(productName, productPriceString) {
    cart[productName] = cart[productName] || { price: productPriceString, quantity: 0 };
    cart[productName].quantity += 1;

    alert(`${productName} has been added to the cart!`);

    updateCartDisplay();
}

function removeFromCart(productName) {
    cart[productName].quantity -= 1;
    if (cart[productName].quantity === 0) {
        delete cart[productName];
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

    for (let productName in cart) {
        const product = cart[productName];

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>Name: ${productName} - ${product.price} - Quantity: ${product.quantity} <button class="remove-button">Remove</button></p>
        `;

        const removeButton = cartItem.querySelector(".remove-button");
        removeButton.addEventListener("click", () => removeFromCart(productName));
        cartDisplay.appendChild(cartItem);
    }
}

const addToCartButtons = document.querySelectorAll(".product button");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const productCard = this.closest(".product");
        const productName = productCard.querySelector("h1").innerText;
        const productPriceString = productCard.querySelector("p").innerText;
        addToCart(productName, productPriceString);
    });
});

updateCartDisplay();
