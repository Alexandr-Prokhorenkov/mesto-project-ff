function createCard(cardItem, deleteCallBack, likecallback, openImagecallback) {//функция создания карточек 
  const cardTempale = document.querySelector("#card-template").content;//находим элемент Template
  const cardElement = cardTempale
    .querySelector(".places__item")
    .cloneNode(true); //создаем копию карточки
 
  const cardTitle = cardElement.querySelector(".card__title"); //заголовок карточки
  const cardImage = cardElement.querySelector(".card__image"); //фотография карточки
  const delBtn = cardElement.querySelector(".card__delete-button"); //кнопка удаления карточки
  const buttonLike = cardElement.querySelector(".card__like-button"); //кнопка лайка на карточке
  cardImage.src = cardItem.link //присваем src image из значения CardItem
  cardImage.alt = cardItem.name//присваиваем alt из значения CardItem
  cardTitle.textContent = cardItem.name //подпись к фотографии берем из ключа name
  delBtn.addEventListener("click", deleteCallBack); //слушатель соытия на кнопку удаления карточки 
  buttonLike.addEventListener("click", likecallback); //слушатель события на кнопку 
  cardImage.addEventListener('click', openImagecallback);//слушатель события клика на картинку
  return cardElement;
}

function handleDeleteButton(event) { //функция удаления карточки
  event.target.closest(".card").remove();//ищем ближайшую карточку от кнопки удаления и удаляем ее
}

function handleLikeButton(event) {//функция добавления лайка
  const like = event.target;
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, handleDeleteButton, handleLikeButton };
