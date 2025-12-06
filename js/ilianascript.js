// NAVBAR STICKY
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});

// SELECTOR for all badges
const cartBadges = document.querySelectorAll(".cart-badge");

//change number in badge
function updateCartBadge(count) {
    cartBadges.forEach(badge => {
        badge.textContent = count;
    });
}

// add to cart
updateCartBadge(0); 

// FILTER SYSTEM FOR SHOP (safe for index + shop)
document.addEventListener("DOMContentLoaded", () => {

    const filterBtns = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".product-card");

    // If no products exist (index page), just apply visual state and exit
    const hasProducts = products.length > 0;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            // Visual active state
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.dataset.filter;

            // If we are on index → stop here (no filtering needed)
            if (!hasProducts) return;

            // FILTER PRODUCTS
            products.forEach(prod => {
                prod.style.transition = "0.3s";

                if (prod.dataset.category === category) {
                    prod.style.opacity = "1";
                    prod.style.transform = "scale(1)";
                    prod.parentElement.style.display = "block";
                } else {
                    prod.style.opacity = "0";
                    prod.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        prod.parentElement.style.display = "none";
                    }, 300);
                }
            });

            // AUTO SCROLL TO PRODUCTS ONLY IN SHOP
            const productContainer = document.querySelector(".container.my-4");
            if (productContainer) {
                productContainer.scrollIntoView({ behavior: "smooth" });
            }

        });
    });

});

const productsData = [
  {
    id: 1,
    name: "KONG goddie bone",
    price: 14,
    img: "catalog/dog-product1.jpg",
    category: "dogs"
  },
  {
    id: 2,
    name: "KONG Toughz bear",
    price: 20,
    img: "catalog/dog-product2.jpg",
    category: "dogs"
  },
  {
    id: 3,
    name: "SANICAT Classic",
    price: 8,
    img: "catalog/cat-product1.jpg",
    category: "cats"
  },
  {
    id: 4,
    name: "Cat Tree",
    price: 150,
    img: "catalog/cat-product2.jpg",
    category: "cats"
  },
  {
    id: 5,
    name: "Pond Sticks",
    price: 6,
    img: "catalog/aquarium-product1.jpg",
    category: "aquarium"
  },
  {
    id: 6,
    name: "Fish Tank",
    price: 105,
    img: "catalog/aquarium-product2.jpg",
    category: "aquarium"
  },
  {
    id: 7,
    name: "Ferret food",
    price: 11,
    img: "catalog/small-animals-product1.jpg",
    category: "small-animals"
  },
  {
    id: 8,
    name: "Rabbit food",
    price: 21,
    img: "catalog/small-animals-product2.jpg",
    category: "small-animals"
  },
  {
    id: 9,
    name: "Bird food",
    price: 15,
    img: "catalog/bird-product1.jpg",
    category: "birds"
  },
  {
    id: 10,
    name: "Trainer Bag",
    price: 30,
    img: "catalog/farm-product1.jpg",
    category: "farm-animals"
  }

];

/* -----------------------------------------
   SHOP BY PET → REDIRECT TO SHOP WITH FILTER
------------------------------------------ */

document.querySelectorAll(".pet-card2").forEach(card => {
    card.addEventListener("click", () => {
        const category = card.dataset.category;

        // Save category selected
        localStorage.setItem("selectedCategory", category);

        window.location.href = "shop.html";
    });
});


let cart = [];
//let cartCount = document.querySelector(".cart-badge");
let cartItemsContainer = document.getElementById("cartItems");
let cartTotalDisplay = document.getElementById("cartTotal");

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        let id = parseInt(btn.dataset.id);
        let product = productsData.find(p => p.id === id);

        cart.push(product);
        updateCart();
    });
});

function updateCart() {
    // Update count
    updateCartBadge(cart.length);

    // Generate HTML list
    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price;

        cartItemsContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <img src="${item.img}" width="60" class="rounded">
                <div class="ms-2">
                    <strong>${item.name}</strong><br>
                    $${item.price}
                </div>
                <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">X</button>
            </div>
        `;
    });

    // Total
    cartTotalDisplay.textContent = "$" + total.toFixed(2);

    enableRemoveButtons();
}

// Remove items
function enableRemoveButtons() {
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = parseInt(btn.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

/* -----------------------------------------
   CHECKOUT BUTTON — SIMPLE MESSAGE + EMPTY CART
------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.getElementById("checkoutBtn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            alert("🐾✨ Thank you for shopping with us! Your order is complete.");

            cart = [];

            updateCart();
        });
    }
});

