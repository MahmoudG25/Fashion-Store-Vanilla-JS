// latest section
function loadLatestItems() {
    const xhrLatest = new XMLHttpRequest();
    xhrLatest.open('GET', '../data/latest.json', true);
    xhrLatest.onload = function () {
        if (xhrLatest.status === 200) {
            const data = JSON.parse(xhrLatest.responseText);
            const links = ['#product.html?id=31', '#product.html?id=41', '#product.html?id=11'];
            let i = 0;
            data.forEach(element => {
                latestDisplay(element, links[i]);
                i++;
            });
        } else {
            console.error('Request failed');
        }
    };
    xhrLatest.send();
}

loadLatestItems();


// const latest = JSON.parse("")

function latestDisplay(latest, link) {
    document.querySelector(".arr-elements").innerHTML += `
  <div class="card raised">
    <div class="mask"></div>
    <div class="card-image">
    <img src="${latest.image}" alt="" srcset="">

    

      
    </div>
    <div class="card-info">
      <h4 class="card-title">${latest.title}</h4>
      <p class="card-text">${latest.text}</p>
      
      <a href="${link}">
      <p>SHOP NOW</p>
    </a>
    </div>
  </div>
`
}

(function applyDarkMode() {
    const isDark = localStorage.getItem("dark");

    if (isDark === "true") {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            section.classList.add("dark");
        });
    }
})();

// function darkMode(isDark) {
//     const sections = document.querySelectorAll("section");
//     sections.forEach(section => {
//         section.classList.toggle("dark", isDark);
//     });
// }

// darkMode(localStorage.getItem("dark"))
