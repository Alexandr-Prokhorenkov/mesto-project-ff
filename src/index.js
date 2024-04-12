import "./pages/index.css";

import {
  loadData,
  saveProfileData,
  saveCardToServer,
  saveProfileAvatar,
} from "./components/api.js";

import { enableValidation, clearValidation } from "./components/validation.js";
import { createCard, handleLikeButton, deleteCard } from "./components/card.js";
import { openPopUp, closePopUp } from "./components/modal.js";
import {apiErrorHandler} from "./components/utils.js"

const container = document.querySelector(".page__content"); //объявляем контейнер внутри документа
const cardsContainer = container.querySelector(".places__list"); //переменная куда будут складываться карточки
const profileImage = document.querySelector(".profile__image");
const buttonProfile = document.querySelector(".profile__edit-button"); //кнопка вызова попапа редактирования данных
const buttonAddCard = document.querySelector(".profile__add-button"); //кнопка вызова попапа добавления карточки
const newPlace = document.forms["new-place"]; //форма добавления карточки нового места
const cardName = newPlace["place-name"]; // инпут добавления названия нового места
const cardLink = newPlace.link; //инпут добавления ссылки на фотографию
const profile = document.forms["edit-profile"]; //форма редактирования данных имени и описания деятельности
const nameInput = profile.name; //инпут имени
const jobInput = profile.description; //инпут рода деятельности
const profileTitle = document.querySelector(".profile__title"); //имя отображаемое на сайте
const profileDescription = document.querySelector(".profile__description"); //род деятельности отображаемый на сайте
const popUpImageCaption = document.querySelector(".popup__caption"); //подпись фотографии при ее раскрытии в большом размере
const popUpImage = document.querySelector(".popup__image"); //Img фотографии которая будет открываться
const popUpS = document.querySelectorAll(".popup"); //массив всех модальных окон
const popUpTypeImage = document.querySelector(".popup_type_image"); //модальное окно увеличенной фотографии
const popUpAddImage = document.querySelector(".popup_type_new-card"); //модальное окно добавления карточки
const popUpProfile = document.querySelector(".popup_type_edit"); //модальное окно редактирования данных
const popUpDelete = document.querySelector(".popup_type_delete"); //модальное окно удаления карточки
const buttonDeleteCard = popUpDelete.querySelector('.popup__button');
const popUpAddAvatar = document.querySelector(".popup_type_new-avatar");
const avatar = document.forms["new-avatar"];
const avatarInput = avatar.link;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const loadingsCards = (
  cardsArray,
  likecallback,
  deleteCallBack,
  openImagecallback,
  userId
) => {
  //функция создания карточек
  cardsArray.forEach((element) => {
      const card = createCard(
        element,
        deleteCallBack,
        likecallback,
        openImagecallback,
        userId
      );
      cardsContainer.append(card);
  });
};

const updateUserInfo = (userObject, image, description, title) => {
  image.style.backgroundImage = `url('${userObject.avatar}')`;
  description.textContent = userObject.about;
  title.textContent = userObject.name;
};

loadData().then(([userDataObject, cardsDataObject]) => {
  const userId = userDataObject._id; //вытавскиваем свой Id и передаем его loadingsCards для проверки моя/не моя карточка
  updateUserInfo(userDataObject, profileImage, profileDescription, profileTitle);
  loadingsCards(
    cardsDataObject,
    handleLikeButton,
    handleDeleteButton,
    handleImageClick,
    userId
  )})
  .catch(apiErrorHandler)

let cardToDelete;

buttonDeleteCard.addEventListener("click", () => {
  deleteCard(cardToDelete)
  closePopUp(popUpDelete)
})

function handleDeleteButton (cardElement) {
  cardToDelete = cardElement;
  openPopUp(popUpDelete)
}

function editPopUpProfile() {
  //функция открытия модалки профиля
  nameInput.value = profileTitle.textContent; //значения инпута имени = значению на сайте
  jobInput.value = profileDescription.textContent; //значения инпута рода деятельности = значению на сайте
  openPopUp(popUpProfile); //функция открытия модалки профиля
  clearValidation(profile, validationConfig);
}

function handleFormSubmit(evt) {
  //функция замены значений имени и должности дефолтной на значений из инпутов
  evt.preventDefault(); //сбрасываем значение по умолчанию submit
  const userName = nameInput.value; //значение имени из инпута
  const userJob = jobInput.value; //значение должности из инпута
  const submitButton = profile.querySelector(".popup__button");
  renderLoading(true, submitButton); // Устанавливаем текст кнопки на "Сохранение..."
  saveProfileData(userName, userJob) //сохраняем данные на сервере
    .then(() => {
  profileTitle.textContent = userName; //заменяем дефолтные значения на странице на введенные
  profileDescription.textContent = userJob; //заменяем дефолтные значения на странице на введенные
  closePopUp(popUpProfile); 
    })
    .catch(apiErrorHandler)
    .finally(() => {
  renderLoading(false, submitButton); // Возвращаем текст кнопки на исходное значение
  });
}

function handleAddCardFormSubmit() {
  //функция открытия формы добавления карточек
  openPopUp(popUpAddImage);
  clearValidation(newPlace, validationConfig);
}

function handleImageClick(event) {
  //функция открытия фотографии по клику на карточку
  if (event.target.classList.contains("card__image")) {
    //проверям содержит ли элемент по которому кликнули класс который содежит img
    popUpImage.src = event.target.src; //присваиваем открывающейся фотографии src с того элемента по которому кликнули
    popUpImage.alt = event.target.alt; //присваиваем alt открывающейся фотографии alt с того элемента по которому был клик
    popUpImageCaption.textContent = event.target.alt; //присваем значение подписи фотографии из значения alt
    openPopUp(popUpTypeImage); //открываем модальное окно с фотографией
  }
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

popUpS.forEach(function (element) {
  //запускаем цикл для всех модальных окон
  element.classList.add("popup_is-animated"); //добаляем всем моадльным окнам новый класс для opacity

  function outOfClick(event) {
    //функция закрытия модальных окон через клик в пустое местро или по крестику
    if (
      event.target.classList.contains("popup_is-opened") ||
      event.target.classList.contains("popup__close")
    ) {
      closePopUp(element);
    }
  }
  element.addEventListener("mousedown", outOfClick); //вешаем слушатель события для всех моадлок по клику
});

buttonProfile.addEventListener("click", function () {
  //событие клика на кнопку вызова модального окна профиля
  editPopUpProfile();
});

profile.addEventListener("submit", handleFormSubmit); //слушатель на отправку данных из формы редактирования давнных
newPlace.addEventListener("submit", function (evt) {
  //слушатель на форму добавления новой карточки по отправке
  evt.preventDefault(); // сбрасываем перезагрузку страницы
  const newObj = {
    //создаем новый объект
    name: cardName.value, //записываем в значение ключа name значение из инпута
    link: cardLink.value, ///записываем в значение ключа link значение из инпута
  };
  const submitButton = newPlace.querySelector(".popup__button");

  renderLoading(true, submitButton);
  saveCardToServer(newObj)
  .then(resp => {
    const card = createCard(
      resp,
      handleDeleteButton,
      handleLikeButton,
      handleImageClick,
      resp.owner._id
    )
    cardsContainer.prepend(card)
    closePopUp(popUpAddImage); //закрываем модальное окно добавления карточек
    newPlace.reset(); //сбрасываем значения формы добавления карточки
  })
  .catch(apiErrorHandler)
  .finally(() => {
    renderLoading(false, submitButton); // Возвращаем текст кнопки на исходное значение
  });
});

buttonAddCard.addEventListener("click", handleAddCardFormSubmit); //слушатель события для кнопки вызова модального окна добавления новой карточки

profileImage.addEventListener("click", function () {
  openPopUp(popUpAddAvatar);
  avatarInput.value = "https://somewebsite.com/someimage.jpg";
  clearValidation(profile, validationConfig);
});



avatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const avatarlink = avatarInput.value;
  const submitButton = avatar.querySelector(".popup__button");
  renderLoading(true, submitButton); // Устанавливаем текст кнопки на "Сохранение..."
  saveProfileAvatar(avatarlink)
    .then((data) => {
      // Обновляем src изображения на странице
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      // Закрываем модальное окно после успешного изменения аватара
      closePopUp(popUpAddAvatar);
    })
    .catch(apiErrorHandler)
    .finally(() => {
      renderLoading(false, submitButton); // Возвращаем текст кнопки на исходное значение
    });
});

  enableValidation(validationConfig);
