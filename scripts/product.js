function initProductPage() {
  // === Load Product Details from URL (from hash) ===
  const hash = window.location.hash;
  const productId = Number(new URLSearchParams(hash.split('?')[1]).get('id'));

  sessionStorage.removeItem("selectedSize")

  if (!productId) {
    console.warn("Invalid or missing product ID in URL");
    return;
  }

  // === Determine category based on ID range ===
  let category = "";
  if (productId <= 10) category = "hats";
  else if (productId <= 20) category = "shoes";
  else if (productId <= 30) category = "trousers";
  else if (productId <= 40) category = "dresses";
  else if (productId <= 50) category = "jackets";
  else {
    console.warn("Product ID out of expected range");
    return;
  }

  const userEmail = JSON.parse(localStorage.getItem('LoggedInUser')).email || 'guest';

  fetch('../data/collections.json')
    .then(res => res.json())
    .then(data => {
      const products = data[category];
      let foundProduct = products.find(item => item.id === productId);

      if (!foundProduct) {
        document.querySelector('#content').innerHTML = "<h2>Product not found</h2>";
        return;
      }

      // === Inject Product HTML ===
      const sectionPr = document.getElementById("product-s-p");
      sectionPr.innerHTML = `
        <div class="product-display">
          <div class="image-grid">
            ${foundProduct.images.map(src => `
              <div class="image-box">
                <img src="${src}" alt="${foundProduct.title}">
              </div>
            `).join('')}
          </div>
          <div class="product-info">
            <div class="top-row">
              <h2>${foundProduct.title}</h2>
              <div class="icons">
                <span>♡</span>
                <span>↗</span>
              </div>
            </div>
            <p class="price">${foundProduct.price}</p>
            <p class="description">${foundProduct.description}</p>
            <p class="vendor">${foundProduct.vendor}</p>
            <div class="options">
              <label>Size</label>
              <div class="sizes">
                <button>S</button>
                <button>M</button>
                <button>L</button>
              </div>
            </div>
            <div class="buy-row">
              <button class="add-to-cart">Add to Cart - ${foundProduct.price}</button>
              <div class="quantity">
                <label>Quantity</label>
                <div class="qty-controls">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
            </div>
            <div class="shipping">
              <span>Free standard shipping</span>
              <a href="#">Free Returns</a>
            </div>
          </div>
        </div>
      `;

      // === Setup Events ===

      // Add to Cart
      document.querySelector('.add-to-cart')?.addEventListener('click', function () {


        let userEmail = JSON.parse(localStorage.getItem('LoggedInUser')).email;

        if (userEmail.length <= 1) {

          alert("You need to login first")
          return;
          // localStorage.setItem("tempCart", JSON.stringify({}));
          // cart = JSON.parse(localStorage.getItem('tempCart'))
        }

        const qty = parseInt(document.querySelector('.qty-controls span').innerText);
        const size = sessionStorage.getItem('selectedSize') || null;

        if (!size) {
          alert("Please select the size");
          return;
        }

        const product = {
          id: foundProduct.id,
          size,
          quantity: qty
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        const index = cart[userEmail].findIndex(p => p.id === product.id && p.size === product.size);

        if (index === -1) {
          cart[userEmail].push(product);
        } else {
          cart[userEmail][index].quantity += product.quantity;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Product added to cart!");
      });

      // Favorite
      const favoriteIcon = document.querySelector('.icons span:first-child');
      let isFavorited = false;
      favoriteIcon?.addEventListener('click', function () {
        let favorites = JSON.parse(localStorage.getItem('wishlist')) || {};
        if (!favorites[userEmail]) favorites[userEmail] = [];

        const index = favorites[userEmail].findIndex(p => p.name === foundProduct.title);
        if (index === -1) {
          favorites[userEmail].push({ name: foundProduct.title, price: foundProduct.price, id: foundProduct.id });
          isFavorited = true;
        } else {
          favorites[userEmail].splice(index, 1);
          isFavorited = false;
        }

        favoriteIcon.innerText = isFavorited ? '♥' : '♡';
        localStorage.setItem('wishlist', JSON.stringify(favorites));
      });

      // Size Selection
      const sizeButtons = document.querySelectorAll('.sizes button');
      sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
          sizeButtons.forEach(btn => btn.style.background = 'white');
          button.style.background = '#ddd';
          sessionStorage.setItem('selectedSize', button.innerText);
        });
      });

      // Quantity Controls
      const qtySpan = document.querySelector('.qty-controls span');
      const minusBtn = document.querySelector('.qty-controls button:first-child');
      const plusBtn = document.querySelector('.qty-controls button:last-child');

      minusBtn?.addEventListener('click', () => {
        let count = parseInt(qtySpan.innerText);
        if (count > 1) qtySpan.innerText = count - 1;
      });

      plusBtn?.addEventListener('click', () => {
        let count = parseInt(qtySpan.innerText);
        qtySpan.innerText = count + 1;
      });

    }).catch(err => {
      console.error("Error loading product:", err);
      document.querySelector('#content').innerHTML = "<h2>Failed to load product</h2>";
    });
}

// ✅ Safe to run after DOM is ready (if you're injecting page dynamically)
document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
});

initProductPage();
