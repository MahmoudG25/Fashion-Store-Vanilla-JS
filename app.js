document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify({}));
  }

  if (localStorage.getItem("allUsers") === null) {
    localStorage.setItem("allUsers", JSON.stringify({}));
  }

  if (localStorage.getItem("wishlist") === null) {
    localStorage.setItem("wishlist", JSON.stringify({}));
  }

  if (localStorage.getItem("LoggedInUser") === null) {
    localStorage.setItem("LoggedInUser", JSON.stringify({
      name: "",
      email: "",
      isLoggedIn: false
    }));
  }


  // handling sign in and logout
  const signin = document.querySelector('.login');
  const logout = document.querySelector('.logout');

  if (JSON.parse(localStorage.getItem("LoggedInUser")).isLoggedIn === false) {
    signin?.classList.remove("hide");
    logout?.classList.add("hide");
  } else {
    logout?.classList.remove("hide");
    signin?.classList.add("hide");
  }
});

document.querySelector('.logout').addEventListener("click", () => {
  const conf = confirm("Are you sure you want to log out?");

  if (conf === true) {
    localStorage.setItem("LoggedInUser", JSON.stringify({
      name: "",
      email: "",
      isLoggedIn: false
    }));
    location.href = "#home";
  }
  else {
    return;
  }
})


const loadPage = async (page) => {
  const content = document.getElementById('content');

  try {
    const response = await fetch(`pages/${page}.html`);
    if (!response.ok) throw new Error('Page not found');
    const html = await response.text();
    content.innerHTML = html;

    // // Remove old script
    const oldScript = document.getElementById('page-script');
    if (oldScript) oldScript.remove();

    // Reload the new script
    let pageName = page.split('?')[0].replace('.html', ''); 
    const script = document.createElement('script');
    script.src = `scripts/${pageName}.js`;
    script.id = 'page-script';
    document.body.appendChild(script);



  } catch (err) {
    content.innerHTML = `<style>
    .not-found{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 500px;

    }
    .not-found h1, .not-found h2{
        position: absolute;
        font-size: xx-large;
        font-weight: 800;
        font-family: "bungee";
        color: #222;
    }

.not-found h1{
    top: 250px;
}

.not-found h2{
    top: 300px;
}
    
    .not-found svg{
        width: 300px;
        height: 300px;
        fill: #222
    }
</style>
    <section>
        <div class="not-found">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#5a6de3"
                height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 443.834 443.834"
                xml:space="preserve">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier">
                    <g>
                        <path
                            d="M388.907,152.072l-159.49-45.413V84.734c19.98-3.554,35.197-21.052,35.197-42.037C264.614,19.154,245.46,0,221.917,0 S179.22,19.154,179.22,42.697c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5C194.22,27.425,206.645,15,221.917,15 s27.697,12.425,27.697,27.697s-12.425,27.697-27.697,27.697c-4.142,0-7.5,3.358-7.5,7.5v28.766L54.928,152.072 c-13.256,3.774-21.183,15.943-19.278,29.594c1.906,13.65,12.862,23.184,26.645,23.184h10.122v10.984h-19.5 c-4.142,0-7.5,3.358-7.5,7.5v213c0,4.142,3.358,7.5,7.5,7.5h338c4.142,0,7.5-3.358,7.5-7.5v-213c0-4.142-3.358-7.5-7.5-7.5h-19.5 V204.85h10.122c13.783,0,24.739-9.534,26.645-23.184C410.09,168.016,402.162,155.847,388.907,152.072z M383.417,230.834v198h-323 v-198h12v2.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-2.5h269v2.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-2.5H383.417 z M356.417,215.834h-269V204.85h269V215.834z M393.328,179.592c-0.661,4.732-4.145,10.258-11.789,10.258h-10.122v-6.516 c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v6.516h-269v-6.516c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v6.516H62.295 c-7.645,0-11.128-5.526-11.789-10.258c-0.66-4.731,1.177-11,8.529-13.093l162.882-46.379L384.8,166.499 C392.152,168.592,393.989,174.86,393.328,179.592z" />
                    </g>
                </g>

            </svg>
            <h1>404</h1>
            <h2>Not Found</h2>
        </div>
    </section>`;
  }
};

function router() {
  const hash = window.location.hash.replace('#', '') || 'home';
  loadPage(hash);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

let darkValue = localStorage.getItem("dark");
const mode = document.querySelector('.mode');
const lightSvg = mode.querySelector('#svg-one');
const darkSvg = mode.querySelector('#svg-two');

if (darkValue === null) {
  localStorage.setItem("dark", "false");
  darkValue = "false";
}

darkMode(darkValue === "true");



mode.addEventListener("click", () => {
  let current = localStorage.getItem("dark") === "true";
  let next = !current;

  localStorage.setItem("dark", next.toString());
  darkMode(next);
});

function darkMode(isDark) {
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    section.classList.toggle("dark", isDark);
  });

  lightSvg.style.display = isDark ? "none" : "block";
  darkSvg.style.display = isDark ? "block" : "none";
}


const sliderSelectors = {
  hero1: document.getElementById('sel1'),
  hero2: document.getElementById('sel2'),
  hero3: document.getElementById('sel3'),
}

const keys = Object.keys(sliderSelectors);
let currentIndex = 0;
let intervalID;
let pauseFlag = 0;

const changeHeros = (sel, auto = true) => {

  const currentActiveHeros = document.querySelectorAll('.active')
  const currentActiveSels = document.querySelectorAll('.active-sel')

  !auto && !pauseFlag ? pauseSliding() : null;

  currentActiveHeros.forEach(activeHero => {
    activeHero.classList.remove('active')



    activeHero.querySelector('.hero-header').classList.remove('hero-header-animation')
    activeHero.querySelector('.hero-icon').classList.remove('hero-icon-animation')
    activeHero.querySelector('.hero-subtext').classList.remove('hero-subtext-animation')
    activeHero.querySelector('.hero-button').classList.remove('hero-button-animation')

  });

  currentActiveSels.forEach(activeSel => {
    activeSel.classList.remove('active-sel')

  });

  const active_hero = document.querySelector(`.${sel}`)
  active_hero.classList.add('active')

  active_hero.querySelector('.hero-header')?.classList.add('hero-header-animation');
  active_hero.querySelector('.hero-icon')?.classList.add('hero-icon-animation');
  active_hero.querySelector('.hero-subtext')?.classList.add('hero-subtext-animation');
  active_hero.querySelector('.hero-button')?.classList.add('hero-button-animation');

  sliderSelectors[sel].classList.add('active-sel')

}

for (const sel in sliderSelectors) {
  sliderSelectors[sel].addEventListener("click", changeHeros.bind(this, sel, false))
}

const autoSliding = () => {
  intervalID = setInterval(() => {
    changeHeros(keys[currentIndex], true);
    currentIndex = (currentIndex + 1) % keys.length;
  }, 4000);
  pauseFlag = 0;
}

const pauseSliding = (delay = 15000) => {
  if (pauseFlag) {
    return
  }
  clearInterval(intervalID);
  setTimeout(autoSliding, delay);
  pauseFlag = 1
}

autoSliding()

// Debounce utility for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// navbar scrolling
const handleScroll = () => {
  const navbar = document.querySelector('.navbar-container');
  const lightSvg = mode.querySelector('#svg-one')
  const isLightVisible = lightSvg.style.display !== "none";

  if (window.scrollY > 40) {
    isLightVisible ? navbar.classList.add('scrolled')
      : navbar.classList.add('dark-scrolled')
      ;
  } else {
    navbar.classList.remove('scrolled');
    navbar.classList.remove('dark-scrolled');
  }
};

// Use debounced scroll handler for better performance
window.addEventListener('scroll', debounce(handleScroll, 10));


// hide carousel if not home page
const homeLoc = ["#home", "#", ""];
const handleHashChange = () => {
  const hash = window.location.hash.toLowerCase();
  const carousel = document.querySelector('.carousel');
  const nav = document.querySelector('nav')

  if (!homeLoc.includes(hash)) {
    carousel?.classList.add("hide");
    nav?.classList.add("reduce")
  } else {
    carousel?.classList.remove("hide");
    nav?.classList.remove("reduce")

  }
};

handleHashChange();
window.addEventListener("hashchange", handleHashChange);
