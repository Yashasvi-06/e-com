document.addEventListener('DOMContentLoaded', () => {
  // Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
      });
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // Slideshow
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlides() {
    slides.forEach(s => {
      s.classList.remove('active');
    });
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
  }

  setInterval(showSlides, 3000);
  showSlides(); // Initialize

  // Swipe Support
  let xStart = null;
  const slideshow = document.querySelector('.slideshow');
  if (!slideshow) return;
slideshow.addEventListener('touchstart', e => {
  xStart = e.touches[0].clientX;
});

slideshow.addEventListener('touchend', e => {
  if (!xStart) return;
  const xEnd = e.changedTouches[0].clientX;
  if (xEnd - xStart > 50) slideIndex = (slideIndex - 2 + slides.length) % slides.length;
  else if (xStart - xEnd > 50) slideIndex = (slideIndex + 1) % slides.length;
  showSlides();
  xStart = null;
});

// Cart
let cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if (!cartItemsContainer || !cartTotal) {
  console.error("Cart elements are missing in the DOM.");
  return;
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.name} - ₹${item.price}`;
    cartItemsContainer.appendChild(itemDiv);
    total += item.price;
  });
  cartTotal.textContent = `Total: ₹${total}`;
}
const cartToggle = document.getElementById("cart-toggle");
const cartElement = document.getElementById("cart");

if (cartToggle && cartElement) {
  cartToggle.addEventListener("click", () => {
    cartElement.classList.toggle("hidden");
  });
} else {
  console.error("Cart toggle or cart container is missing in the DOM.");
}

document.getElementById("cart-toggle").addEventListener("click", () => {
  document.getElementById("cart").classList.toggle("hidden");
});
const cartItems = [];
const cartTotalElement = document.getElementById('cart-total');

function addToCart(productCard) {
  const name = productCard.getAttribute('data-name');
  const price = parseInt(productCard.getAttribute('data-price'), 10);

  cartItems.push({ name, price });
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${item.name} - ₹${item.price}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
      cartItems.splice(index, 1);
      updateCart();
    };
    itemElement.appendChild(removeButton);
    cartItemsContainer.appendChild(itemElement);
    total += item.price;
  });

  cartTotalElement.textContent = `Total: ₹${total}`;
}

function checkout() {
  alert('Thank you for your purchase!');
  cartItems.length = 0;
  updateCart();
}