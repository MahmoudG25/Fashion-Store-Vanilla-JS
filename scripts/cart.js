function cartLoad() {



  const cart = JSON.parse(localStorage.getItem("cart"))
  const LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"))

  let userCart = cart[LoggedInUser.email]

  console.log(userCart)


  var Prodcard = document.querySelector(".Prod-card")
  var subtotal = 0;

  fetch('../data/collections.json')
    .then(res => res.json())
    .then(data => {
      userCart.forEach(item => {

        let category = "";
        if (item.id <= 10) category = "hats";
        else if (item.id <= 20) category = "shoes";
        else if (item.id <= 30) category = "trousers";
        else if (item.id <= 40) category = "dresses";
        else if (item.id <= 50) category = "jackets";
        else {
          console.warn("Product ID out of expected range");
          return;
        }


        itemData = data[category].find(i => i.id === item.id)
        subtotal += item.quantity * itemData.price
        console.log("sub", subtotal)

        Prodcard.innerHTML += `
                <div class="prod-section">
                  <div class="frame1">
                    <div class="prodimage1"><img src="${itemData.images[0]}" class="img"></div>
                    <div class="inf-prod">
                      <div class="Prod-S-P-Q">
                        <h3 class="prodName">${itemData.title}</h3>
                        <p class="prodSize">Size:  ${item.size}</p>
                        <p class="prodQ">Quantity: ${item.quantity}</p>
                        <p class="price">$${item.quantity * itemData.price}</p>
                    </div>
                </div>
                <div class="btnremove">
                    <p class="vendorName">Vendor: ${itemData.vendor}</p>
                    <button data-item-id="${item.id}" data-item-size="${item.size}"  class="removebtn">Remove</button></div>
                
                </div>
              <hr> 
              `
      });

      document.querySelector(".ship-total").innerHTML += `
            <p class="T-price" ">$${subtotal}</p>
`;
      var shipping = 50

      document.querySelector(".cal").innerHTML = `<p id="cal">$${shipping}</p>`
      var total = parseFloat(subtotal + shipping)

      document.querySelector(".totalprice").innerHTML += `<p class="T-price" id="total">$${total}</p>`;

      document.addEventListener("click", function (event) {

        if (event.target.classList.contains("removebtn")) {

          let clickedButton = event.target;
          var btnremo = event.target.closest(".frame1").querySelector(".prodName").innerHTML;
          var subprice = event.target.closest(".frame1").querySelector(".price").innerHTML;
          var priceint = parseFloat(subprice.replace(/[^\d.]/g, ""))
          // console.log(priceint)
          //  console.log(totalprice)

          subtotal -= priceint

          document.querySelector(".ship-total").innerHTML = `
            <p class="Text-sum" >Subtotal</p>
            <p class="T-price" class="Subtotal">$${subtotal}</p>
`;
          var total = parseFloat(subtotal + shipping)

          document.querySelector(".totalprice").innerHTML = `
             <p class="Text-sum">Total</p>
             <p class="T-price" class="total">$${total}</p>`;

          // console.log(totalprice)

          let itemId = clickedButton.dataset.itemId;
          let itemSize = clickedButton.dataset.itemSize;
          console.log("itemId:", itemId);
          console.log("itemSize:", itemSize);
          
          let itemIndex = userCart.findIndex(cartItem => { cartItem.id === itemId && cartItem.size === item.size })
          userCart.splice(itemIndex, 1);


          cart[LoggedInUser.email] = userCart

          console.log(itemIndex, "\n", userCart)

          console.log(userCart)
          localStorage.setItem("cart", JSON.stringify(cart));

          event.target.closest(".frame1").remove();

          console.log("deleted");
        }
      });

    }
    )
}

cartLoad();
