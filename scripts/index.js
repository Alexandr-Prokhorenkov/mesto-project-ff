
const container = document.querySelector('.page__content');
const cardsContainer = container.querySelector('.places__list');

function onDelete(event) {
  event.target.closest('.card').remove()
}

function addfunc(cardItem, deleteCallBack) {
  const cardTempale = document.querySelector('#card-template').content;
  const cardElement = cardTempale.querySelector('.places__item').cloneNode(true);
  const delBtn = cardElement.querySelector('.card__delete-button');
  delBtn.addEventListener('click', deleteCallBack);
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = cardItem.description;
  return cardElement
}

for(let i=0;i<initialCards.length;i++) {
  const cardItem = addfunc(initialCards[i], onDelete);
  cardsContainer.append(cardItem);
}

