import { createCard, onDelete, addLike, buttonsClose, popUpS} from './components/card.js'; 
import { handleFormSubmit, openPopUp, closePopUp, escapeClose, 
  clickClose, nameInput, jobInput, profile} from './components/modal.js';

const container = document.querySelector(".page__content");
const cardsContainer = container.querySelector(".places__list");
const popUpProfile = popUpS[0];
const buttonProfile = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonsSave = document.querySelectorAll('.popup__button');
const buttonAddImage = document.querySelector('.profile__add-button');
const popUpAddImage = popUpS[1];
const newPlace = document.forms['new-place'];
const cardName = newPlace['place-name'];
const cardLink = newPlace.link;

for (let i = 0; i < initialCards.length; i++) {
  const cardItem = createCard(initialCards[i], onDelete);
  cardsContainer.append(cardItem);
}

popUpS.forEach(function(element){
  element.classList.add('popup_is-animated')
})

function typeEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popUpProfile);
  buttonsClose[0].addEventListener('click', function(){
    closePopUp(popUpProfile);
    profile.reset()
  })
  escapeClose(popUpProfile);
  clickClose(popUpProfile);
  buttonsSave[0].addEventListener('click', function(){
  profile.addEventListener('submit', handleFormSubmit)
  closePopUp(popUpProfile)
 })
}

buttonProfile.addEventListener('click', function(){
 typeEdit()
})

function typeNewCard() {
  openPopUp(popUpAddImage)
  buttonsClose[1].addEventListener('click', function(){
    closePopUp(popUpAddImage);
  })
  escapeClose(popUpAddImage);
  clickClose(popUpAddImage);  
  buttonsSave[1].addEventListener('click', function(){
  newPlace.addEventListener('submit', function(evt){
    evt.preventDefault();
    let newObj = {
      name: cardName.value,
      link: cardLink.value,
      description: '',
    }
    let cardItem = createCard(newObj, onDelete,addLike);
    cardsContainer.prepend(cardItem);
    closePopUp(popUpAddImage);
    newPlace.reset();
  });
  })
}

buttonAddImage.addEventListener('click',typeNewCard)
const buttonsLike = document.querySelectorAll('.card__like-button')


buttonsLike.forEach(function(button){
  button.addEventListener('click', addLike)
})
