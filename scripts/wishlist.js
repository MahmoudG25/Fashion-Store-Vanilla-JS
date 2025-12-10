function wishLoad() {



  const wishlist = JSON.parse(localStorage.getItem("wishlist"))
  const LoggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"))

  let userWish = wishlist[LoggedInUser.email]

  var Prodcard = document.querySelector(".prodcard")

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
        else {
          console.warn("Product ID out of expected range");
          return;
        }


        itemData = data[category].find(i => i.id === item.id)

        Prodcard.innerHTML += `
<div class="card1">
                <div id="prodimage1"><img src="${itemData.images[0]}"></div>
                <div id="text1">
                    <div class="prod-name-heart">
                    <div class="nameofprod"><p class="prodname">${itemData.title}</p></div>
                    <div class="btnheart"><button class="heart">&#x2764;</button></div>
                 </div>
                <div id="priceofprod"><p class="prodprice">$${itemData.price}</p> </div>
               </div>
               
            </div> 

              `

      });

      document.addEventListener("click", function (event) {

        if (event.target.classList.contains("heart")) {

          var btnremo = event.target.closest(".card1").querySelector(".prodname").innerHTML;



          var btnheart = document.querySelectorAll(".heart")

          for (x = 0; x < btnheart.length; x++) {


            btnheart[x].addEventListener("click", function () {
              car["user2"] = car["user2"].filter(item => item.productName !== btnremo);

              this.classList.toggle("active");

            });
          }



          localStorage.setItem("cart", JSON.stringify(car));

          event.target.closest(".card1").remove();
        }
      });

    }
    )
}

wishLoad();
