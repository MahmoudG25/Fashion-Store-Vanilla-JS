function wishLoad() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    const LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));

    // Check if user is logged in
    if (!LoggedInUser || !LoggedInUser.email) {
        document.querySelector(".prodcard").innerHTML = "<h2>Please login to view your wishlist</h2>";
        return;
    }

    let userWish = wishlist[LoggedInUser.email] || [];
    var Prodcard = document.querySelector(".prodcard");

    // Clear existing content mainly to avoid duplicates if re-run
    Prodcard.innerHTML = "";

    if (userWish.length === 0) {
        Prodcard.innerHTML = "<h2>Your wishlist is empty</h2>";
        return;
    }

    fetch('../data/collections.json')
        .then(res => res.json())
        .then(data => {
            userWish.forEach(item => {
                let category = "";
                if (item.id <= 10) category = "hats";
                else if (item.id <= 20) category = "shoes";
                else if (item.id <= 30) category = "trousers";
                else if (item.id <= 40) category = "dresses";
                else if (item.id <= 50) category = "jackets";
                
                // If ID logic fails or changed, try to find by ID across all categories
                let itemData = null;
                if(category && data[category]) {
                    itemData = data[category].find(i => i.id === item.id);
                } else {
                     // Fallback search
                     for(const cat in data) {
                        const found = data[cat].find(i => i.id === item.id);
                        if(found) {
                            itemData = found;
                            break;
                        }
                     }
                }

                if (itemData) {
                    Prodcard.innerHTML += `
                        <div class="card1" data-id="${itemData.id}">
                            <div id="prodimage1"><img src="${itemData.images[0]}" alt="${itemData.title}"></div>
                            <div id="text1">
                                <div class="prod-name-heart">
                                    <div class="nameofprod"><p class="prodname">${itemData.title}</p></div>
                                    <div class="btnheart"><button class="heart active" title="Remove from wishlist">&#x2764;</button></div>
                                </div>
                                <div id="priceofprod"><p class="prodprice">$${itemData.price}</p> </div>
                            </div>
                        </div> 
                    `;
                }
            });

            // Event Delegation for Heart Button (Removal)
            Prodcard.addEventListener("click", function (event) {
                if (event.target.classList.contains("heart")) {
                    const card = event.target.closest(".card1");
                    const productId = Number(card.getAttribute('data-id'));
                    const productName = card.querySelector(".prodname").innerText;

                    // Remove from DOM
                    card.remove();

                    // Update LocalStorage
                    const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
                    let userItems = currentWishlist[LoggedInUser.email] || [];
                    
                    // Filter out the item
                    userItems = userItems.filter(item => item.id !== productId);
                    currentWishlist[LoggedInUser.email] = userItems;
                    
                    localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
                    
                    // Show Custom Popup
                    if (typeof showPopup === 'function') {
                        showPopup(`${productName} removed from wishlist`, 'info');
                    } else {
                        console.log("Removed from wishlist");
                    }

                    // Show empty message if list is empty
                    if (userItems.length === 0) {
                        Prodcard.innerHTML = "<h2>Your wishlist is empty</h2>";
                    }
                }
            });

        })
        .catch(err => {
            console.error("Error loading wishlist items:", err);
            Prodcard.innerHTML = "<h2>Error loading wishlist. Please try again later.</h2>";
        });
}

// Ensure utils.js is loaded for showPopup, or define a fallback
if(typeof showPopup === 'undefined') {
    // Dynamically load utils if not present (though HTML should assume it)
    const script = document.createElement('script');
    script.src = "../scripts/utils.js";
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', wishLoad);
