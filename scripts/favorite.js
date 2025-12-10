   const cart = {
  "user1": [
    {
      id: 101,
      productName: "T-Shirt Classic",
      size: "M",
      qty: 2,
      price: 199.99,
      vendor: "StyleHub",
      image: "/liviloris-0688-scaled.jpg"
    },
    {
      id: 102,
      productName: "Jeans Slim Fit",
      size: "32",
      qty: 1,
      price: 349.50,
      vendor: "DenimWorld",
        image: "/liviloris-0688-scaled.jpg"

    }
  ],
  "user2": [
    {
      id: 201,
      productName: "Sneakers Low-Top",
      size: "42",
      qty: 1,
      price: 499.00,
      vendor: "FootGear",
      image: "/liviloris-0688-scaled.jpg"
    },
    {
      id: 202,
      productName: "Hoodie Oversized",
      size: "L",
      qty: 3,
      price: 299.99,
      vendor: "UrbanWear",
      image: "/liviloris-0688-scaled.jpg"
    },
    {
      id: 202,
      productName: "Hoodie Oversized",
      size: "M",
      qty: 2,
      price: 299.99,
      vendor: "UrbanWear",
      image: "/liviloris-0688-scaled.jpg"
    }
    
  ]
};

var cartStr = JSON.stringify(cart)
localStorage.setItem("cart",cartStr)


var text = localStorage.getItem("cart")
var textarr = JSON.parse(text)
var car = textarr


var Prodcard = document.getElementsByClassName("prodcard")[0]


for(var i =0 ; i<car["user2"].length; i++){


      Prodcard.innerHTML += `   

            <div class="card1">
                <div id="prodimage1"><img src="${car["user2"][i].image}"></div>
                <div id="text1">
                    <div class="prod-name-heart">
                    <div class="nameofprod"><p class="prodname">${car["user2"][i].productName}</p></div>
                    <div class="btnheart"><button class="heart">&#x2764;</button></div>
                 </div>
                <div id="priceofprod"><p class="prodprice">$${car["user2"][i].price}</p> </div>
               </div>
               
            </div> `
     
            


            
     }
   
   
   
   


 document.addEventListener("click", function(event) {

  if (event.target.classList.contains("heart")) {
    
    var btnremo = event.target.closest(".card1").querySelector(".prodname").innerHTML;
  


   var btnheart = document.querySelectorAll(".heart")
   
   for(x=0 ; x<btnheart.length; x++){


         btnheart[x].addEventListener("click", function () {
      car["user2"] = car["user2"].filter(item => item.productName !== btnremo);

        this.classList.toggle("active");
    
    });
}



    localStorage.setItem("cart", JSON.stringify(car));

    event.target.closest(".card1").remove();
  }
});




