/* image swaping for image section */
function setImageSwap(imgId, defaultSrc, hoverSrc) {
  const img = document.getElementById(imgId);

  if (!img) return;

  img.src = defaultSrc;

  img.onmouseover = function () {
    img.src = hoverSrc;
  };

  img.onmouseout = function () {
    img.src = defaultSrc;
  };
}

/* tops color variation */
function swapImage(id, newSrc) {
  document.getElementById(id).src = newSrc;
}

/* OTHER ITEMS HOVER SWAP */
function swapImageOnly(el, newSrc) {
  el.src = newSrc;
}

/* add to cart + save to cart page */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: name,
    price: price,
    image: image
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

/* update cart count */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

/* show cart items */
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");

  if (!cartContainer || !totalContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.textContent = "Total: BD 0.000";
    return;
  }

  cart.forEach(function (item, index) {
    total += item.price;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>BD ${item.price}.000</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  totalContainer.textContent = "Total: BD " + total + ".000";
}

/* remove from cart */
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
  updateCartCount();
}

/* add to favorites */
function addToFavorites(button) {
  button.classList.toggle("favorited");

  if (button.classList.contains("favorited")) {
    button.textContent = "♥ Favorited";
  } else {
    button.textContent = "♡ Favorite";
  }
}

/* lightbox */
function openLightbox(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

/* contact form validation */
function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  let result = document.getElementById("form-result");

  if (name === "" || email === "" || message === "") {
    result.innerText = "Please fill all fields.";
    return false;
  }

  result.innerText = "Message sent!";
  return false;
}

/* style quiz */
function showQuizResult() {
  let category = document.getElementById("category-choice").value;
  let mood = document.getElementById("mood-choice").value;
  let result = document.getElementById("quiz-result");

  if (category === "" || mood === "") {
    result.innerHTML = "Please answer both questions to get your style recommendation.";
    return;
  }

  let softScore = 0;
  let minimalScore = 0;
  let streetScore = 0;

  if (category === "soft") softScore++;
  if (category === "minimal") minimalScore++;
  if (category === "street") streetScore++;

  if (mood === "soft") softScore++;
  if (mood === "minimal") minimalScore++;
  if (mood === "street") streetScore++;

  if (softScore >= minimalScore && softScore >= streetScore) {
    result.innerHTML = `
      <h3>Your Style: Soft Feminine</h3>
      <p>We recommend fitted tops, dirty pink shades, ribbon accessories, and soft everyday pieces.</p>
    `;
  } else if (minimalScore >= softScore && minimalScore >= streetScore) {
    result.innerHTML = `
      <h3>Your Style: Clean Minimal</h3>
      <p>We recommend navy basics, simple pants, neutral tones, and effortless outfit combinations.</p>
    `;
  } else {
    result.innerHTML = `
      <h3>Your Style: Soft Streetwear</h3>
      <p>We recommend oversized hoodies, cargo pants, chocolate brown tones, and relaxed casual looks.</p>
    `;
  }
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

/* checkout confirmation */
function confirmCheckout() {
  let result = confirm("Proceed to payment?");

  if (result) {
    alert("Redirecting to payment...");
  }
}

window.onload = function () {
  updateCartCount();
  displayCart();
};