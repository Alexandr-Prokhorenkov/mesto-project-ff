import { likeCard, renderLike, unlikeCard } from "./api.js";

function createCard(
  cardItem,
  deleteCallBack,
  likecallback,
  openImagecallback,
  callbackId
) {
  //функция создания карточек
  const cardTempale = document.querySelector("#card-template").content; //находим элемент Template
  const cardElement = cardTempale
    .querySelector(".places__item")
    .cloneNode(true); //создаем копию карточки
  const cardTitle = cardElement.querySelector(".card__title"); //заголовок карточки
  const cardImage = cardElement.querySelector(".card__image"); //фотография карточки
  const delBtn = cardElement.querySelector(".card__delete-button"); //кнопка удаления карточки
  delBtn.dataset.cardId = cardItem._id;
  const buttonLike = cardElement.querySelector(".card__like-button"); //кнопка лайка на карточке
  buttonLike.dataset.cardId = cardItem._id;
  if (callbackId) {
    cardElement.dataset.cardId = callbackId;
  }
  // const quantityLikes = cardElement.querySelector('.quantity-likes'); //количество лайков
  // quantityLikes.textContent = cardItem.likes.length.toString()
  cardImage.src = cardItem.link; //присваем src image из значения CardItem
  cardImage.alt = cardItem.name; //присваиваем alt из значения CardItem
  cardTitle.textContent = cardItem.name; //подпись к фотографии берем из ключа name
  delBtn.addEventListener("click", deleteCallBack); //слушатель соытия на кнопку удаления карточки
  buttonLike.addEventListener("click", likecallback); //слушатель события на кнопку
  cardImage.addEventListener("click", openImagecallback); //слушатель события клика на картинку
  if (cardItem.likes && Array.isArray(cardItem.likes)) {
    setLikesCount(cardElement, cardItem.likes.length);
  } else {
    setLikesCount(cardElement, 0); // Если свойство likes отсутствует или не является массивом, устанавливаем количество лайков как 0
  }
  return cardElement;
}

function setLikesCount(cardElement, likesCount) {
  const quantityLikes = cardElement.querySelector(".quantity-likes");
  quantityLikes.textContent = likesCount.toString();
}

function handleLikeButton(event) {
  //функция добавления лайка
  const like = event.target;
  const cardId = event.target.dataset.cardId;
  const isLiked = like.classList.contains("card__like-button_is-active");
  if (isLiked) {
    unlikeCard(cardId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Error", response.status);
        }
      })
      .then((data) => {
        const updatedLikesCount = data.likes.length;
        renderLike(like.parentNode, updatedLikesCount);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
  } else {
    likeCard(cardId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Error", response.status);
        }
      })
      .then((data) => {
        const updatedLikesCount = data.likes.length;
        renderLike(like.parentNode, updatedLikesCount);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
  }
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, handleLikeButton };
