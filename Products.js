document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            let newItem = {
                name: name,
                price: price,
                quantity: 1,
            };
            cart.push(newItem);
        }

        alert(name + " has been added to the cart!");

        updateCartDisplay();
    }

    function removeFromCart(item) {
        item.quantity -= 1;

        if (item.quantity === 0) {
            cart = cart.filter(cartItem => cartItem !== item);
        }

        updateCartDisplay();
    }

    function updateCartDisplay() {
        let cartSection = document.getElementById("cart-section");
        cartSection.innerHTML = "";

        let displayTitle = document.createElement("h2");
        displayTitle.textContent = "Shopping Cart";
        displayTitle.style.textAlign = "center";
        cartSection.appendChild(displayTitle);

        cart.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <p>${item.name} - ${item.price.toFixed(2)} -  ${item.quantity}<button class="remove-button">Remove</button></p>
            `;

            let removeButton = cartItem.querySelector(".remove-button");
            removeButton.addEventListener("click", function () {
                removeFromCart(item);
            });

            cartSection.appendChild(cartItem);
        });
    }

    let addToCartButtons = document.querySelectorAll(".product button");

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let productName = document.querySelectorAll(".product h1")[index].textContent;
            let productPrice = parseFloat(document.querySelectorAll(".product p")[index].textContent.replace("Price: $", ""));
            addToCart(productName, productPrice);
        });
    });

    // Call the function initially to display any existing items in the cart
    updateCartDisplay();
});
