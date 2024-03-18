function createCard(cardItem, deleteCallBack, likecallback, openImagecallback) {
  const cardTempale = document.querySelector("#card-template").content;
  const cardElement = cardTempale
    .querySelector(".places__item")
    .cloneNode(true);
 
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const delBtn = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  cardImage.src = cardItem.link
  cardImage.alt = cardItem.name
  cardTitle.textContent = cardItem.name
  delBtn.addEventListener("click", deleteCallBack);  
  buttonLike.addEventListener("click", likecallback);
  cardImage.addEventListener('click', openImagecallback);
  return cardElement;
}

function handleDeleteButton(event) {
  event.target.closest(".card").remove();
}

function handleLikeButton(event) {
  const like = event.target;
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, handleDeleteButton, handleLikeButton };
