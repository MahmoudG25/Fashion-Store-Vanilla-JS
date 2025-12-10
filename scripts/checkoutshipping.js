
const shippingRadios = document.querySelectorAll('input[name="shipping_check"]');


// document.getElementById("shipping_check").addEventListener("change",function(){

//         if (this.checked) {
//       this.parentNode.style.border = "2px solid black";
//     }
//         else  {
//       this.parentNode.style.border = "0";
//     }

// })

var gotoflag = false

shippingRadios.forEach(radio => {
  radio.addEventListener("change", function () {
    shippingRadios.forEach(r => r.parentNode.style.border = "none");

    if (this.checked) {
      this.parentNode.style.border = "2px solid black";
      gotoflag = true
    }
    
  });
});



document.getElementById("continue").addEventListener("click",function(){
  
    if(gotoflag){open("#checkoutpayment","_self") }
    else{alert("You have to choose a shipping method")}
})


function cartLoad() {



  const cart = JSON.parse(localStorage.getItem("cart"))
  const LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"))

  let userCart = cart[LoggedInUser.email]

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
                    <button data-item-id="${item.id}" data-item-size="${item.size}"  class="removebtn" style="border:0px;"></button></div>
                
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

          subtotal -= priceint

          document.querySelector(".ship-total").innerHTML = `
            <p class="Text-sum" >Subtotal</p>
            <p class="T-price" class="Subtotal">$${subtotal}</p>
`;
          var total = parseFloat(subtotal + shipping)

          document.querySelector(".totalprice").innerHTML = `
             <p class="Text-sum">Total</p>
             <p class="T-price" class="total">$${total}</p>`;

          let itemId = clickedButton.dataset.itemId;
          let itemSize = clickedButton.dataset.itemSize;
          
          let itemIndex = userCart.findIndex(cartItem => { cartItem.id === itemId && cartItem.size === item.size })
          userCart.splice(itemIndex, 1);


          cart[LoggedInUser.email] = userCart

          localStorage.setItem("cart", JSON.stringify(cart));

          event.target.closest(".frame1").remove();
        }
      });

    }
    )
}

cartLoad();


    document.querySelector(".Shipping").innerHTML +=`<p id="cal">$${50}</p>`
           var shipping = 50            
    var total = parseFloat(totalprice + shipping)

             document.querySelector(".totalprice").innerHTML +=`<p class="T-price" id="total">$${Math.round(total)}</p>`;

document.getElementById("coupon").addEventListener("keypress",function(){
             if(document.getElementById("coupon").value.trim()=="ITI10"){document.querySelector(".totalprice").innerHTML =`<p class="Text-sum">Total</p> <p class="T-price" id="total">$${Math.round(total*0.9)}</p>`;}
             else if(document.getElementById("coupon").value.trim()=="ITI20"){document.querySelector(".totalprice").innerHTML =`<p class="Text-sum">Total</p> <p class="T-price" id="total">$${Math.round(total*0.8)}</p>`;}else{document.querySelector(".totalprice").innerHTML =`<p class="Text-sum">Total</p> <p class="T-price" id="total">$${Math.round(total)}</p>`;}

             if(document.getElementById("coupon").value.trim()=="ITI10"){document.querySelector(".discount").innerHTML =`<p class="Text-sum">Discount</p> <p class="T-price" id="total">$${Math.round(total*0.1)}</p>`;}
             else if(document.getElementById("coupon").value.trim()=="ITI20"){document.querySelector(".discount").innerHTML =`<p class="Text-sum">Discount</p> <p class="T-price" id="total">$${Math.round(total*0.2)}</p>`;}else{document.querySelector(".discount").innerHTML =`<p class="Text-sum">Discount</p> <p class="T-price" id="total">$${0}</p>`;}

            })
             


    

             



   

//   document.addEventListener("click", function(event) {

//   if (event.target.classList.contains("removebtn")) {
    
//     var btnremo = event.target.closest(".frame1").querySelector(".prodName").innerHTML;
//     var subprice = event.target.closest(".frame1").querySelector(".price").innerHTML;
//     var priceint =parseFloat(subprice.replace(/[^\d.]/g, ""))
// // console.log(priceint)
// //  console.log(totalprice)

//       totalprice -= priceint
    
//             document.querySelector(".ship-total").innerHTML = `
//             <p class="Text-sum" >Subtotal</p>
//             <p class="T-price" class="Subtotal">$${totalprice}</p>
// `;
//     var total = parseFloat(totalprice + shipping)

//              document.querySelector(".totalprice").innerHTML =`
//              <p class="Text-sum">Total</p>
//              <p class="T-price" class="total">$${total}</p>`;

// // console.log(totalprice)

// car["user1"] = car["user1"].filter(item => item.productName !== btnremo);

//     localStorage.setItem("cart", JSON.stringify(car));

//     event.target.closest(".frame1").remove();

//     console.log("deleted");
//   }
// });

        



           


 








