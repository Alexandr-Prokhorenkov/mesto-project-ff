import { likeCard, unlikeCard, deleteCardFromServer } from "./api.js";
import {apiErrorHandler} from "./utils.js"

const setLikesCount = (cardElement, likesCount) => { //функция установки количества лайков
  const quantityLikes = cardElement.querySelector(".quantity-likes");
  quantityLikes.textContent = likesCount.toString();
}

const createCard = ( //функция создания карточек
  cardItem,
  deleteCallBack,
  likecallback,
  openImagecallback,
  userId
) => {

  const cardTempale = document.querySelector("#card-template").content; //находим элемент Template
  const cardElement = cardTempale
    .querySelector(".places__item")
    .cloneNode(true); //создаем копию карточки
  const cardTitle = cardElement.querySelector(".card__title"); //заголовок карточки
  cardTitle.textContent = cardItem.name; //подпись к фотографии берем из ключа name

  const cardImage = cardElement.querySelector(".card__image"); //фотография карточки
  cardImage.src = cardItem.link; //присваем src image из значения CardItem
  cardImage.alt = cardItem.name; //присваиваем alt из значения CardItem
  cardImage.addEventListener("click", openImagecallback); //слушатель события клика на картинку

  const delBtn = cardElement.querySelector(".card__delete-button"); //кнопка удаления карточки
  delBtn.addEventListener("click", () => deleteCallBack(cardElement));
  cardElement.dataset.cardId = cardItem._id;
  if(userId !== cardItem.owner._id) { //создаем условие создания кнопки удаления
    cardElement.removeChild(delBtn) //удаляем кнопку с чужих карточек
  }

  const buttonLike = cardElement.querySelector(".card__like-button"); //кнопка лайка на карточке
  buttonLike.addEventListener("click", likecallback); //слушатель события на кнопку
  buttonLike.dataset.cardId = cardItem._id;
  if (cardItem._id) {
    cardElement.dataset.cardId = cardItem._id;
  }
  if (cardItem.likes && Array.isArray(cardItem.likes)) { //если свойство likes присутствует и является массивом
    setLikesCount(cardElement, cardItem.likes.length); //отображаем значение лайков
  } else {
    setLikesCount(cardElement, 0); // Если свойство likes отсутствует или не является массивом, устанавливаем количество лайков как 0
  }

  if(cardItem.likes.find(elem => elem._id === userId)){ //если id карточки равен id user-а 
    buttonLike.classList.toggle("card__like-button_is-active"); //вешаем активное состояние на кнопку
  }
  return cardElement;
}

const renderLike = (cardElement, likesCount) => { //Функция обновления лайков
  const quantityLikes = cardElement.querySelector(".quantity-likes"); // Находим элемент, отображающий количество лайков
  if (quantityLikes) {
    quantityLikes.textContent = likesCount.toString(); // Обновляем текстовое содержимое элемента с количеством лайков
  }
}

const handleLikeButton = (event) => {   //функция добавления лайка
  const like = event.target;
  const cardId = event.target.dataset.cardId;
  const isLiked = like.classList.contains("card__like-button_is-active");
  if (isLiked) {
    unlikeCard(cardId)
      .then((data) => {
        const updatedLikesCount = data.likes.length;
        renderLike(like.parentNode, updatedLikesCount);
        like.classList.toggle("card__like-button_is-active"); //снимаем значение активного лайка после того как сервер ответил
      })
      .catch(apiErrorHandler);
  } else {
    likeCard(cardId)
      .then((data) => {
        const updatedLikesCount = data.likes.length;
        renderLike(like.parentNode, updatedLikesCount);
        like.classList.toggle("card__like-button_is-active"); //устанавливаем значение активного лайка после того как сервер ответил
      })
      .catch(apiErrorHandler);
  }
}

const deleteCard = (cardElement) => { //Функцтя удаления карточки из DOM  + с сервера
    deleteCardFromServer(cardElement.dataset.cardId) // Вызываем функцию удаления карточки с сервера
      .then(() => {
        cardElement.remove();
        console.log("Карточка успешно удалена");
      })
      .catch(apiErrorHandler);
}

export { createCard, handleLikeButton, deleteCard };
