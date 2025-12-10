// Checkout Address Script
document.addEventListener('DOMContentLoaded', () => {
    
    // Load saved data if available
    const email = JSON.parse(localStorage.getItem('LoggedInUser'))?.email;
    if (email) {
        const savedData = JSON.parse(localStorage.getItem(`${email}_address`));
        if (savedData) {
            document.getElementById("fname").value = savedData.firstName || "";
            document.getElementById("lname").value = savedData.lastName || "";
            document.getElementById("address").value = savedData.address || "";
            document.getElementById("apartment").value = savedData.apartment || "";
            document.getElementById("cityaddress").value = savedData.cityAddress || "";
            document.getElementById("country").value = savedData.country || "";
            document.getElementById("city").value = savedData.city || "";
            document.getElementById("zipcode").value = savedData.zipCode || "";
            document.getElementById("optional").value = savedData.optional || "";
            document.getElementById("save").checked = true;
        }
    }

    // Form Submission
    const form = document.getElementById("shipping_info");
    if(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const fname = document.getElementById("fname");
            const lname = document.getElementById("lname");
            const address = document.getElementById("address");
            const cityaddress = document.getElementById("cityaddress");
            const country = document.getElementById("country");
            const city = document.getElementById("city");
            const zipcode = document.getElementById("zipcode");
            
            let isValid = true;
            
            // Helper validator
            const validate = (element, minLen) => {
                if(element.value.trim().length < minLen) {
                    element.style.border = "2px solid red";
                    isValid = false;
                } else {
                    element.style.border = "1px solid #ccc"; 
                }
            };

            validate(fname, 2);
            validate(lname, 2);
            validate(address, 5);
            validate(cityaddress, 2);
            validate(city, 2);
            
            if(!zipcode.value.trim() || isNaN(zipcode.value)) {
                 zipcode.style.border = "2px solid red";
                 isValid = false;
            } else {
                zipcode.style.border = "1px solid #ccc";
            }
            
            if(!country.value) {
                country.style.border = "2px solid red";
                isValid = false;
            } else {
                country.style.border = "1px solid #ccc";
            }

            if(!isValid) {
                 if(typeof showPopup === 'function') showPopup("Please fix the highlighted fields", "error");
                 else alert("Please fix errors");
                 return;
            }

            // Save Data
             var data = {
                firstName: fname.value.trim(),
                lastName: lname.value.trim(),
                address: address.value.trim(),
                apartment: document.getElementById("apartment").value.trim(),
                cityAddress: cityaddress.value.trim(),
                country : country.value,
                city: city.value.trim(),
                zipCode: zipcode.value.trim(),
                optional: document.getElementById("optional").value.trim()
            };

            const save = document.getElementById("save").checked;
            if (save && email) {
                localStorage.setItem(`${email}_address`, JSON.stringify(data));
            } else {
                // If not saving for future, at least keep it for this session flow
                sessionStorage.setItem(`temp_address`, JSON.stringify(data));
            }

            // Proceed to next step
            window.location.hash = "#checkoutshipping";
        });
    }

    // Load Cart Summary (Mini Cart)
    loadCartSummary();
});

function loadCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    
    if(!LoggedInUser) return;

    let userCart = cart[LoggedInUser.email] || [];
    const Prodcard = document.querySelector(".Prod-card");
    
    if(!Prodcard) return;

    let subtotal = 0;
    Prodcard.innerHTML = ""; // Clear

    fetch('../data/collections.json')
        .then(res => res.json())
        .then(data => {
            userCart.forEach(item => {
                // Find product data logic
                let itemData = null;
                // Try category first if we knew it, else search all
                 for(const cat in data) {
                    const found = data[cat].find(i => i.id === item.id);
                    if(found) {
                        itemData = found;
                        break;
                    }
                 }

                if(itemData) {
                    const itemTotal = item.quantity * itemData.price;
                    subtotal += itemTotal;
                    
                    Prodcard.innerHTML += `
                        <div class="mini-prod-item">
                            <div class="mini-img-wrapper">
                                <img src="${itemData.images[0]}" alt="${itemData.title}">
                                <span class="mini-qty-badge">${item.quantity}</span>
                            </div>
                            <div class="mini-prod-info">
                                <p class="mini-prod-name">${itemData.title}</p>
                                <p class="mini-prod-variant">${item.size} / ${itemData.vendor}</p>
                            </div>
                            <div class="mini-prod-price">
                                <p>$${itemTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    `;
                }
            });

            // Update Totals
            const shipping = 50; 
            const total = subtotal + shipping;
            
            const subtotalEl = document.querySelector(".ship-total .T-price"); // Check selectors in HTML
            // If strictly using existing HTML structure:
            // ship-total might be empty initially
             const shipTotalContainer = document.querySelector(".ship-total");
             if(shipTotalContainer) shipTotalContainer.innerHTML = `<p class="Text-sum">Subtotal</p><p class="T-price">$${subtotal.toFixed(2)}</p>`;
             
             const shippingContainer = document.querySelector(".Shipping");
             if(shippingContainer) shippingContainer.innerHTML = `<p class="Text-sum">Shipping</p><p class="cal">$${shipping.toFixed(2)}</p>`;

             const totalContainer = document.querySelector(".totalprice");
             if(totalContainer) totalContainer.innerHTML = `<p class="Text-sum">Total</p><p class="T-price" id="total" style="font-weight:bold; font-size:1.1rem;">$${total.toFixed(2)}</p>`;

        }).catch(err => console.error(err));
}
