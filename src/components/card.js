import { openPopUp, closePopUp, escapeClose, clickClose } from './modal.js';

const popUpImageCaption = document.querySelector('.popup__caption');
const popUpImage = document.querySelector('.popup__image');
const buttonsClose = document.querySelectorAll('.popup__close');
const popUpS = document.querySelectorAll('.popup');
const popUpTypeImage = popUpS[2];

function createCard(cardItem, deleteCallBack, addLike) {
  const cardTempale = document.querySelector("#card-template").content;
  const cardElement = cardTempale
    .querySelector(".places__item")
    .cloneNode(true);
  const delBtn = cardElement.querySelector(".card__delete-button");
  delBtn.addEventListener("click", deleteCallBack);
  cardElement.querySelector(".card__title").textContent = cardItem.name;
  const cardImage = cardElement.querySelector(".card__image")
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.description;
  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', addLike)
  cardElement.addEventListener('click', function(event){
    if(event.target.classList.contains('card__image')) {
    popUpImage.src = event.target.src
    popUpImageCaption.textContent = event.target.alt
    openPopUp(popUpTypeImage);
    escapeClose(popUpTypeImage);
    clickClose(popUpTypeImage);
    buttonsClose[2].addEventListener('click', function(){
      closePopUp(popUpTypeImage)
    })
  }
  })
  return cardElement;
}

function onDelete(event) {
  event.target.closest(".card").remove();
}

function addLike(event) {
  const like = event.target
  like.classList.toggle('card__like-button_is-active')
}

export { createCard, onDelete, addLike, buttonsClose, popUpS}; 