import { movies } from "./movies.js";

const itemsContainer = document.querySelector(".container");

function isLiked(movieId) {
  const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
  return likedMovies.includes(movieId);
}

function toggleLike(movieId) {
  let likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];

  likedMovies = likedMovies.filter((id) => typeof id === "string");

  const index = likedMovies.indexOf(movieId);
  if (index > -1) {
    likedMovies.splice(index, 1);
  } else {
    likedMovies.push(movieId);
  }

  localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
}

function createElements(movies) {
  movies.forEach((movie) => {
    const article = document.createElement("article");
    article.classList.add("item");
    article.dataset.id = movie.id;

    const header = document.createElement("header");
    header.classList.add("item-header");

    const itemLink = document.createElement("a");
    itemLink.classList.add("item-link");
    itemLink.href = movie.url;
    itemLink.target = "_blank";

    const img = document.createElement("img");
    img.classList.add("item-image");
    img.src = movie.image;
    img.alt = movie.title;

    const itemTitle = document.createElement("h3");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = movie.title;

    itemLink.appendChild(img);
    itemLink.appendChild(itemTitle);
    header.appendChild(itemLink);
    article.appendChild(header);

    const section = document.createElement("section");
    section.classList.add("item-info");
    const yearParagraph = document.createElement("p");
    yearParagraph.innerHTML = `<strong>Year:</strong> <span class="item-year">${movie.year}</span>`;

    const directorParagraph = document.createElement("p");
    directorParagraph.innerHTML = `<strong>Director:</strong> <span class="item-director">${movie.director}</span>`;

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.classList.add("item-description");
    descriptionParagraph.innerHTML = `<strong>Description:</strong> ${movie.description}`;

    section.appendChild(yearParagraph);
    section.appendChild(directorParagraph);
    section.appendChild(descriptionParagraph);
    article.appendChild(section);

    const cardFooter = document.createElement("footer");
    cardFooter.classList.add("card-footer");

    const likeButton = document.createElement("button");
    likeButton.classList.add("item-button");

    if (isLiked(movie.id)) {
      likeButton.classList.add("is-liked");
    }

    cardFooter.appendChild(likeButton);
    article.appendChild(cardFooter);

    itemsContainer.appendChild(article);
  });
}

createElements(movies);

const input = document.querySelector("input");

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll("article");

  input.addEventListener("input", function (event) {
    const searchQuery = event.target.value.trim().toLowerCase();

    if (searchQuery.length === 0) {
      cards.forEach((card) => {
        card.style.display = "flex";
      });
    } else {
      cards.forEach((card) => {
        const cardTitle = card.querySelector("h3").textContent.toLowerCase();
        const cardYear = card
          .querySelector(".item-year")
          .textContent.toLowerCase();
        const cardDirector = card
          .querySelector(".item-director")
          .textContent.toLowerCase();

        const searchWords = searchQuery.split(" ");

        const includesTitle = searchWords.every((word) =>
          cardTitle.includes(word)
        );

        const includesDirector = searchWords.every((word) =>
          cardDirector.includes(word)
        );

        const includesYear = searchWords.some((word) =>
          cardYear.includes(word)
        );

        card.style.display =
          includesTitle || includesDirector || includesYear ? "flex" : "none";
      });
    }
  });

  initializeLikeButtons();
});

function initializeLikeButtons() {
  const likeButtons = document.querySelectorAll(".item-button");

  likeButtons.forEach((button) => {
    const movieId = button.parentElement.parentElement.dataset.id;

    if (isLiked(movieId)) {
      button.classList.add("is-liked");
    }

    button.addEventListener("click", function () {
      button.classList.toggle("is-liked");
      toggleLike(movieId);
    });
  });
}

const title = document.querySelector(".title");

gsap.fromTo(
  title,
  { scale: 0.8, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }
);

const placeholderText = input.getAttribute("placeholder");

function animatePlaceholder() {
  input.setAttribute("placeholder", "");

  gsap.to(input, {
    delay: 1,
    duration: 2,
    ease: "none",
    placeholder: placeholderText,
    onUpdate: function () {
      input.setAttribute(
        "placeholder",
        this.vars.placeholder.substr(
          0,
          Math.ceil(this.progress() * placeholderText.length)
        )
      );
    },
  });
}

animatePlaceholder();
