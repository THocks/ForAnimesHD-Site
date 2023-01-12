const HlanimeList = document.querySelector(".highlights ul");
const animeCase = document.querySelector(".anime-showcase");

// HL = highlights //
// Criar cada card highlights //
function createCardAnime(game) {
  const Hlcard = document.createElement("li");

  Hlcard.innerHTML = `
        <p class="tag">${game.category}</p>
        <h3>${game.name}</h3>
    `;
  Hlcard.style.backgroundImage = 'url("' + game.img + '")';
  Hlcard.id = game.id;
  return Hlcard;
}

// Colocar os cards highlights dos game no ul//
function listarAnimes(listaAnimes) {
  for (let i = 0; i < listaAnimes.length; i++) {
    const game = listaAnimes[i];

    const cardMontado = createCardAnime(game);

    if (i == 0) {
      //deixar apenas o primeiro ativo como padrão
      cardMontado.classList.add("Active");
    }

    HlanimeList.appendChild(cardMontado);
  }
}

listarAnimes(cardsAnimes);

const HlCards = document.querySelectorAll(".highlights ul li");

// Deixar selecionado um anime na pag //
HlanimeList.addEventListener("click", (e) => {
  const gameCard = e.target;
  let number = 0;
  if (gameCard.tagName == "LI") {
    gameCard.classList.add("Active");
    animeGame(gameCard.id);

    for (let i = 0; i < HlCards.length; i++) {
      if (HlCards[i].id !== gameCard.id) {
        HlCards[i].classList.remove("Active");
        window.scroll(0, 0);
      }
    }
  }
});

// Mudar o anime em destaque //
const video = document.querySelector(".video");
function animeGame(id) {
  const animesSelect = cardsAnimes[id];
  video.src = animesSelect.bg;
  animeCase.innerHTML = `
            <div class="tags">
            ${createTags(animesSelect.tags)}
            </div>
            <div class="classeExtrelas">
              <span class="stars">
              ${createStars(animesSelect.stars)}
              </span>
              <p>${animesSelect.dev}</p>
            </div>
            <h2>${animesSelect.name}</h2>
            <p class="description">
            ${animesSelect.description}
            </p>
            <button>Mais detalhes</button>
          
    `;
}

// códigos responsáveis pelas tags e estrelas //
function createStars(rate) {
  let element = ``;
  for (let i = 1; i <= rate; i++) {
    element += `<i class="ph-star-fill"></i>`;
  }
  return element;
}

function createTags(tags) {
  let tagsList = tags.split(",");
  let tagCard = ``;
  tagsList.forEach((element) => {
    tagCard += `<p class="tag">${element}</p>`;
  });
  return tagCard;
}

// nav mobile //

const menu = document.querySelector(".mobile-menu");
const navList = document.querySelector("nav ul");

menu.addEventListener("click", (e) => {
  console.log("menu clicked");
  navList.classList.toggle("active");
  menu.classList.toggle("open");
  document.body.classList.toggle("menu-expanded");
  window.scroll(0, 0);
});

/* button veja mais */

function vejamais() {
  alert("Estamos ainda em construção aguarde Novidades");
}

/* nav */
const navigatorActive = (counter, navigators) => {
  for (let i = 0; i < navigators.length; i++) {
    if (counter > navigators.length) counter = 1;
    if (counter < 1) counter = navigators.length;

    if (navigators[i].id === "slider_img_" + counter) {
      navigators[i].classList.add("navigatorChildActive");
    } else {
      navigators[i].classList.remove("navigatorChildActive");
    }
  }
};

window.onload = () => {
  const slider = document.querySelector(".sliderSlider");
  let sliderImages = document.querySelectorAll(".sliderImg");

  const prevBtn = document.querySelector(".prevBtn");
  const nextBtn = document.querySelector(".nextBtn");

  const navigator = document.querySelector(".navigator");
  // navegação
  for (let i = 0; i < sliderImages.length; i++) {
    const navigatorChild = document.createElement("div");
    navigatorChild.classList.add("navigatorChild");
    navigatorChild.id = "slider_img_" + (i + 1);
    navigator.appendChild(navigatorChild);
  }
  const navigators = document.querySelectorAll(".navigatorChild");
  navigators[0].classList.add("navigatorChildActive");

  // clonando o none
  const firstNodeClone = sliderImages[0].cloneNode(true);
  firstNodeClone.id = "firstClone";
  slider.appendChild(firstNodeClone);

  // ultimo cloneNode
  const lastNodeClone = sliderImages[sliderImages.length - 1].cloneNode(true);
  lastNodeClone.id = "lastClone";
  slider.prepend(lastNodeClone);

  sliderImages = document.querySelectorAll(".sliderImg");

  let counter = 1;

  let ImageWidth = sliderImages[0].clientWidth;
  slider.style.transform = `translateX(${-counter * ImageWidth}px)`;

  nextBtn.addEventListener("click", () => {
    if (counter >= sliderImages.length - 1) return null;
    slider.style.transition = "all 0.3s ease-in-out";
    counter++;
    slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    navigatorActive(counter, navigators);
  });

  prevBtn.addEventListener("click", () => {
    if (counter <= 0) return null;
    slider.style.transition = "all 0.3s ease-in-out";
    counter--;
    slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    navigatorActive(counter, navigators);
  });

  slider.addEventListener("transitionend", () => {
    if (sliderImages[counter].id === "lastClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - 2;
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    }

    if (sliderImages[counter].id === "firstClone") {
      slider.style.transition = "none";
      counter = sliderImages.length - counter;
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    }
  });

  navigators.forEach((el, i) => {
    el.addEventListener("click", () => {
      counter = i + 1;
      slider.style.transition = "all 0.3s ease-in-out";
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
      navigatorActive(counter, navigators);
    });
  });

  window.onresize = () => {
    ImageWidth = sliderImages[0].offsetWidth;
    slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
  };
};
/* Pesquisar dentro do search renderizar html*/
/*
  let searchText = document.getElementById("searchText");
  let cardContainer = document.getElementById("cardContainer");

  searchText.addEventListener("input", function() {
    let filteredCards = cardsAnimes.filter(card => {
      return card.name.toLowerCase().includes(searchText.value.toLowerCase());
    });

    // Limpar o conteúdo anterior
    cardContainer.innerHTML = "";

    let html = "";
    for (let card of filteredCards) {
      html += `
        <div class="card">
          <img src="${card.img}" alt="${card.name}">
          <h2>${card.name}</h2>
          <p>${card.description}</p>
        </div>
      `;
    }
    cardContainer.innerHTML = html;
  });


*/
