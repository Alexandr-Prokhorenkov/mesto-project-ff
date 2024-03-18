import "./pages/index.css";

import { initialCards } from "./scripts/cards.js";

import {
  createCard,
  handleDeleteButton,
  handleLikeButton,
} from "./components/card.js";
import { openPopUp, closePopUp } from "./components/modal.js";

const container = document.querySelector(".page__content");
const cardsContainer = container.querySelector(".places__list");
const buttonProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const newPlace = document.forms["new-place"];
const cardName = newPlace["place-name"];
const cardLink = newPlace.link;
const profile = document.forms["edit-profile"];
const nameInput = profile.name;
const jobInput = profile.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popUpImageCaption = document.querySelector(".popup__caption");
const popUpImage = document.querySelector(".popup__image");
const popUpS = document.querySelectorAll(".popup");
const popUpTypeImage = document.querySelector(".popup_type_image");
const popUpAddImage = document.querySelector(".popup_type_new-card");
const popUpProfile = document.querySelector(".popup_type_edit");

initialCards.forEach(function (element) {
  const cardItem = createCard(
    element,
    handleDeleteButton,
    handleLikeButton,
    handleImageClick
  );
  cardsContainer.append(cardItem);
});

popUpS.forEach(function (element) {
  element.classList.add("popup_is-animated");

  function outOfClick(event) {
    if (
      event.target.classList.contains("popup_is-opened") ||
      event.target.classList.contains("popup__close")
    ) {
      closePopUp(element);
    }
  }
  element.addEventListener("mousedown", outOfClick);
});

function editPopUpProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popUpProfile);
}

buttonProfile.addEventListener("click", function () {
  editPopUpProfile();
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const userName = nameInput.value;
  const userJob = jobInput.value;
  profileTitle.textContent = userName;
  profileDescription.textContent = userJob;
  closePopUp(popUpProfile);
}

profile.addEventListener("submit", handleFormSubmit);

function handleAddCardFormSubmit() {
  openPopUp(popUpAddImage);
}

function handleImageClick(event) {
  if (event.target.classList.contains("card__image")) {
    popUpImage.src = event.target.src;
    popUpImage.alt = event.target.alt;
    popUpImageCaption.textContent = event.target.alt;
    openPopUp(popUpTypeImage);
  }
}

newPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newObj = {
    name: cardName.value,
    link: cardLink.value,
    description: "",
  };
  const cardItem = createCard(
    newObj,
    handleDeleteButton,
    handleLikeButton,
    handleImageClick
  );
  cardsContainer.prepend(cardItem);
  closePopUp(popUpAddImage);
  newPlace.reset();
});

buttonAddCard.addEventListener("click", handleAddCardFormSubmit);
