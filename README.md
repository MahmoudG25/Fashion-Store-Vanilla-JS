# 🛍️ ITI Frontend E-Commerce Project

A modern, fully-featured e-commerce fashion store built with vanilla JavaScript, HTML5, and CSS3. This project showcases a complete shopping experience with product browsing, cart management, user authentication, and a multi-step checkout process.

![Project Banner](assets/images/slide-01.jpg.webp)

---

## ✨ Features

### 🏪 Shopping Experience
- **Dynamic Product Catalog** - Browse 50+ fashion items across 5 categories (Hats, Shoes, Trousers, Dresses, Jackets)
- **Real-Time Search** - Interactive navbar search with instant filtering
- **Advanced Filtering** - Filter products by category with checkbox controls
- **Smart Sorting** - Sort by Popular, Newest, or Price
- **Product Details** - Comprehensive product pages with image galleries, size selection, and quantity controls
- **Load More Pagination** - Efficient product loading for better performance

### 🛒 Shopping Cart
- **Persistent Cart** - Uses localStorage to maintain cart across sessions
- **Quantity Management** - Adjust product quantities directly in cart
- **Real-Time Calculations** - Dynamic subtotal, shipping, and total calculations
- **Order Summary** - Clear breakdown of costs before checkout

### ❤️ Wishlist
- **Save for Later** - Add products to wishlist for future purchases
- **Quick Access** - Easy management of favorite items

### 👤 User Authentication
- **Sign Up** - Create new user accounts with validation
- **Login** - Secure user login with remember me option
- **Session Management** - Maintains user state throughout shopping

### 📦 Multi-Step Checkout
1. **Address Information** - Shipping and billing details
2. **Shipping Method** - Select delivery options
3. **Payment** - Secure payment information
4. **Order Review** - Final confirmation before purchase

### 🎨 UI/UX Features
- **Responsive Design** - Optimized for desktop, tablet, and mobile (768px, 1024px breakpoints)
- **Dark Mode** - Toggle between light and dark themes
- **Smooth Animations** - Professional transitions and hover effects
- **Hero Carousel** - Auto-rotating banner with featured collections
- **Interactive Search** - Expandable search input in navbar with smooth animations
- **Modern Design System** - Consistent primary color (#5a6de3) across all components

---

## 🚀 Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - No frameworks, pure JS implementation
- **LocalStorage API** - Client-side data persistence
- **Fetch API** - Asynchronous data loading from JSON files

---

## 📁 Project Structure

```
ITI-_Frontend_project_1/
├── index.html                 # Main entry point
├── assets/
│   └── images/               # Product images and banners
│       ├── collections/      # Product category images
│       │   ├── CAPS/
│       │   ├── shoes/
│       │   ├── trousers/
│       │   ├── dresses/
│       │   └── jackets/
│       └── banner images
├── data/
│   ├── collections.json      # Product catalog data
│   └── latest.json          # Latest arrivals data
├── pages/
│   ├── home.html            # Homepage
│   ├── shop.html            # Product listing page
│   ├── product.html         # Product detail page
│   ├── cart.html            # Shopping cart
│   ├── wishlist.html        # Saved items
│   ├── login.html           # User login
│   ├── signup.html          # User registration
│   ├── about.html           # About us page
│   ├── blog.html            # Fashion blog
│   ├── checkoutaddress.html # Checkout step 1
│   ├── checkoutshipping.html# Checkout step 2
│   ├── checkoutpayment.html # Checkout step 3
│   └── checkoutfinal.html   # Checkout step 4
├── scripts/
│   ├── app.js               # Core application logic
│   ├── shop.js              # Shop page functionality
│   ├── product.js           # Product detail logic
│   ├── cart.js              # Cart management
│   ├── wishlist.js          # Wishlist operations
│   ├── favorite.js          # Favorites handling
│   ├── login.js             # Login authentication
│   ├── signup.js            # User registration
│   ├── home.js              # Homepage dynamics
│   ├── checkoutaddress.js   # Checkout step 1 logic
│   ├── checkoutshipping.js  # Checkout step 2 logic
│   ├── checkoutpayment.js   # Checkout step 3 logic
│   └── checkoutfinal.js     # Checkout step 4 logic
└── stylesheets/
    ├── style.css            # Global styles & navbar
    ├── shop.css             # Shop page styling
    ├── cart.css             # Cart page styling
    ├── login.css            # Login page styling
    ├── signup.css           # Signup page styling
    ├── product.css          # Product detail styling
    ├── about.css            # About page styling
    └── blog.css             # Blog page styling
```

---

## 🎯 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for proper file loading)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ITI-_Frontend_project_1.git
   cd ITI-_Frontend_project_1
   ```

2. **Open with a local server**
   
   **Option 1: Using VS Code Live Server**
   - Install the "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

   **Option 2: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open http://localhost:8000
   ```

   **Option 3: Using Node.js**
   ```bash
   npx http-server
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000` (or your server's address)
   - Start shopping! 🛍️

---

## 📱 Responsive Breakpoints

- **Desktop**: 1920px, 1366px
- **Tablet**: 768px - 1024px
- **Mobile**: 375px - 768px
- **Small Mobile**: < 480px

---

## 🎨 Design Features

### Color Scheme
- **Primary**: `#5a6de3` (Modern Blue)
- **Secondary**: `#4a5dd3` (Darker Blue)
- **Dark**: `#222` (Near Black)
- **Light**: `#f8f9fa` (Off White)
- **Text**: `#666`, `#888` (Grays)

### Typography
- **Headings**: Lobster, SpecialGothic
- **Body**: Quicksand, Public Sans
- **Weights**: 400, 600, 700, 800

### Key Animations
- Hero carousel auto-rotation
- Product card hover effects (scale 1.05)
- Search input slide-in animation
- Button transform on hover
- Smooth page transitions

---

## 💾 Data Persistence

The application uses **localStorage** to store:
- Shopping cart items
- Wishlist products
- User authentication state
- Selected product details

### Storage Keys
- `cart` - Cart items object
- `wishlist` - Wishlist items array
- `selectedProduct` - Currently viewed product
- `searchTerm` - Search query (sessionStorage)

---

## 🔍 Search Functionality

### Navbar Search
1. Click the search icon (🔍)
2. Type product name
3. Press Enter to navigate to shop with results
4. Press Escape or click × to close

### Shop Page Search
- Real-time filtering as you type
- Searches product titles
- Works with category filters
- Case-insensitive matching

---

## 🛒 User Flow

```
1. Browse Homepage
   ↓
2. Navigate to Shop
   ↓
3. Filter/Search Products
   ↓
4. View Product Details
   ↓
5. Add to Cart / Wishlist
   ↓
6. Review Cart
   ↓
7. Login/Signup (if needed)
   ↓
8. Checkout (4 steps)
   ↓
9. Order Complete
```

---

## 🎓 Educational Purpose

This project was developed as part of the **ITI (Information Technology Institute)** Frontend Development training program. It demonstrates:

- **Vanilla JavaScript** proficiency
- **DOM manipulation** techniques
- **Event handling** and delegation
- **LocalStorage** data management
- **Fetch API** for data loading
- **Responsive design** principles
- **Modern UI/UX** practices
- **Code organization** and structure
- **Performance optimization** (debouncing, lazy loading)

---

## 🚦 Features Breakdown

| Feature | Status | Description |
|---------|--------|-------------|
| Product Catalog | ✅ | 50 products across 5 categories |
| Search | ✅ | Navbar + Shop page search |
| Filtering | ✅ | Category-based filtering |
| Sorting | ✅ | Popular, Newest, Price |
| Cart | ✅ | Add, remove, update quantities |
| Wishlist | ✅ | Save favorite items |
| Authentication | ✅ | Login and Signup |
| Checkout | ✅ | 4-step process |
| Responsive | ✅ | Mobile, Tablet, Desktop |
| Dark Mode | ✅ | Theme toggle |
| Animations | ✅ | Smooth transitions |

---

## 🔧 Customization

### Adding New Products

Edit `data/collections.json`:

```json
{
  "category_name": [
    {
      "id": 51,
      "title": "New Product",
      "images": [
        "../assets/images/path/to/image1.jpg",
        "../assets/images/path/to/image2.jpg"
      ],
      "description": "Product description",
      "price": 99.99,
      "vendor": "Brand Name"
    }
  ]
}
```

### Changing Colors

Update CSS variables in `stylesheets/style.css`:

```css
/* Primary color used throughout */
#5a6de3 → Your color

/* Update in: buttons, links, focus states, hover effects */
```

---

## 📊 Performance Optimizations

- **Debounced scroll events** for navbar
- **Lazy loading** with "Load More" pagination (6 products at a time)
- **Optimized images** in WebP format
- **Minified code** ready for production
- **No external dependencies** for faster load times

---

## 🐛 Known Issues & Future Enhancements

### Potential Improvements
- [ ] Add product reviews and ratings
- [ ] Implement actual payment gateway
- [ ] Add product comparison feature
- [ ] Email notifications for orders
- [ ] Social media integration
- [ ] Backend API integration
- [ ] User profile management
- [ ] Order history tracking

---

## 🤝 Contributing

This is an educational project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes as part of ITI training program.

---

## 👨‍💻 Author

**ITI Frontend Development Student**

---

## 🙏 Acknowledgments

- ITI (Information Technology Institute) for the training program
- Product images from various sources
- Design inspiration from modern e-commerce platforms

---

## 📞 Support

For questions or issues, please open an issue in the repository.

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ for learning purposes

</div>