const container = document.querySelector(".page__content");
const cardsContainer = container.querySelector(".places__list");

function onDelete(event) {
  event.target.closest(".card").remove();
}

function addfunc(cardItem, deleteCallBack) {
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
  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const cardItem = addfunc(initialCards[i], onDelete);
  cardsContainer.append(cardItem);
}




const buttonProfile = document.querySelector('.profile__edit-button');
const profile = document.forms['edit-profile'];
const nameInput = profile.name;
const jobInput = profile.description;
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const popUpProfile = document.querySelector('.popup_type_edit');
const buttonsClose = document.querySelectorAll('.popup__close');
const buttonsSave = document.querySelectorAll('.popup__button');

function handleFormSubmit(evt) {
  evt.preventDefault();
  let userName = nameInput.value
  let userJob = jobInput.value
  profileTitle.textContent = userName
  profileDescription.textContent = userJob
}

function openPopUp(element) {
  element.setAttribute('style', 'display:flex');
}

function typeEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopUp(popUpProfile);

  function closePopUp() {
    popUpProfile.setAttribute('style', 'display:none')
  }

  buttonsClose[0].addEventListener('click', function(){
    closePopUp();
    profile.reset()
  })

  window.addEventListener('keyup', function(event){
    if(event.key === 'Escape') {
      closePopUp()
    }
  })

 popUpProfile.addEventListener('click', function(event){
 if(event.target===popUpProfile) {
  closePopUp()
 }
 })
 buttonsSave[0].addEventListener('click', function(){
  profile.addEventListener('submit', handleFormSubmit)
  closePopUp()
 })
}

buttonProfile.addEventListener('click', function(){
 typeEdit()
})


const buttonAddImage = document.querySelector('.profile__add-button');
const popUpAddImage = document.querySelector('.popup_type_new-card');
const newPlace = document.forms['new-place'];
const cardName = newPlace['place-name']
const cardLink = newPlace.link


function typeNewCard() {

  openPopUp(popUpAddImage)

  function closePopUp() {
    popUpAddImage.setAttribute('style', 'display:none')
  }

  buttonsClose[1].addEventListener('click', function(){
    closePopUp();
  })

  window.addEventListener('keyup', function(event){
    if(event.key === 'Escape') {
      closePopUp()
    }
  })

  popUpAddImage.addEventListener('click', function(event){
    if(event.target===popUpAddImage) {
     closePopUp()
    }
    })
    
  buttonsSave[1].addEventListener('click', function(evt){
    evt.preventDefault();
    let newObj = {
      name: cardName.value,
      link: cardLink.value,
      description: '',
    }
    initialCards.unshift(newObj)
    console.log(initialCards)
    closePopUp()
    newPlace.reset()
  })
}

buttonAddImage.addEventListener('click',typeNewCard)





