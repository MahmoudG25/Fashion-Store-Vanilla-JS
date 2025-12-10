function loadShopPage() {
  //======= fetching data from JSON file =============
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/collections.json', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      // Loop through each collection
      for (const collectionName in data) {
        if (data.hasOwnProperty(collectionName)) {
          const items = data[collectionName];
          items.forEach(item => {
            itemDisplay(item);
          });
        }
      }

      // Init once items are rendered
      initProductCardEvents();
      showProducts();
    } else {
      console.error('Request failed with status', xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error('Network error occurred');
  };
  xhr.send();

  //======= display item =======
  function itemDisplay(item) {

    let itemcategory = "";
        if (item.id <= 10) itemcategory = "hats";
        else if (item.id <= 20) itemcategory = "shoes";
        else if (item.id <= 30) itemcategory = "trousers";
        else if (item.id <= 40) itemcategory = "dresses";
        else if (item.id <= 50) itemcategory = "jackets";

    document.querySelector(".product").innerHTML += `
      <div class="product-card" data-category="${itemcategory}" data-name="${item.title}">
        <div class="product-image">
          <img src="${item.images[0]}" alt="${item.title}">
        </div>
        <h1 class="product-name">${item.title}</h1>
        <p class="price">EGP ${item.price}</p>
        <p class="shop-now">Shop now</p>
        <div class="card-mask"></div>
        <p class="id">${item.id}</p>

      </div>
    `;
  }

  //========== Add click event to product cards ==========
  function initProductCardEvents() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      card.addEventListener('click', function () {
        const id = Number(card.querySelector(".id").innerText);
        const price = card.querySelector('.price').innerText;
        const selectedProduct = { id, price };
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

        window.location.href = `#product.html?id=${id}`;
      });
    });
  }


  //========== sorted ==========
  const container = document.querySelector('.product');
  const originalCards = [];

  document.getElementById('sort').addEventListener('change', function () {
    const selected = this.value.toLowerCase();
    const cards = Array.from(container.querySelectorAll('.product-card'));

    if (originalCards.length === 0) {
      originalCards.push(...cards);
    }

    let sorted;
    if (selected === 'price') {
      sorted = cards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').innerText.replace('EGP', '').trim());
        const priceB = parseFloat(b.querySelector('.price').innerText.replace('EGP', '').trim());
        return priceA - priceB;
      });
    } else if (selected === 'newest') {
      sorted = cards.reverse();
    } else {
      sorted = originalCards;
    }

    sorted.forEach(card => container.appendChild(card));
  });

  //============== filter ==============
    const checkboxes = document.querySelectorAll('.categories input[type="checkbox"]');

    function getSelectedCategories() {
      return Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.parentElement.textContent.trim().toLowerCase());
    }

    function filterProducts() {
      const selectedCategories = getSelectedCategories();
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        card.style.display = (selectedCategories.length === 0 || selectedCategories.includes(category))
          ? 'block' : 'none';
      });
    }

    checkboxes.forEach(cb => cb.addEventListener('change', filterProducts));

    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        checkboxes.forEach(cb => cb.checked = false);
        filterProducts();
      });
    }

  //================= search functionality ================
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    // Check if there's a search term from navbar
    const navbarSearchTerm = sessionStorage.getItem('searchTerm');
    if (navbarSearchTerm) {
      searchInput.value = navbarSearchTerm;
      sessionStorage.removeItem('searchTerm');
      // Trigger search
      searchInput.dispatchEvent(new Event('input'));
    }

    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.product-card');
      
      cards.forEach(card => {
        const productName = card.getAttribute('data-name').toLowerCase();
        const matchesSearch = productName.includes(searchTerm);
        const currentDisplay = card.style.display;
        
        // Only show if matches search AND passes current filters
        if (matchesSearch && currentDisplay !== 'none') {
          card.style.display = 'block';
        } else if (!matchesSearch) {
          card.style.display = 'none';
        }
      });
    });
  }
  

  //================= load more ================
  let visibleCount = 6;
  let productCards = [];

  function showProducts() {
    productCards = Array.from(document.querySelectorAll('.product-card'));
    productCards.forEach((card, index) => {
      card.style.display = index < visibleCount ? 'block' : 'none';
    });

    if (visibleCount >= productCards.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }

  const loadMoreBtn = document.querySelector('.load-more button');
  loadMoreBtn.addEventListener('click', function () {
    visibleCount += 6;
    showProducts();
  });
}
loadShopPage()

