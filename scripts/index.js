
const container = document.querySelector('.page__content');
const cardsContainer = container.querySelector('.places__list');

function onDelete(event) {
  event.target.closest('.card').remove()
}

function addfunc(cardItem) {
  const cardTempale = document.querySelector('#card-template').content;
  const cardElement = cardTempale.querySelector('.places__item').cloneNode(true);
  const delBtn = cardElement.querySelector('.card__delete-button');
  delBtn.addEventListener('click', onDelete);
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = cardItem.description;
  cardsContainer.append(cardElement);
}

for(i=0;i<initialCards.length;i++) {
  cardItem = addfunc(initialCards[i]);
}

