function openPopUp(element) {
  //функция открытия модального окна
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopUp(element) {
  //функция закрытия модального окна
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape); //удаляем слушатель по Esc
  const btn = element.querySelector('.popup__button'); //ищем кнопку попапа
  if(btn) { //если она есть
    const clone = btn.cloneNode(true); //клонируем ее
    btn.parentNode.replaceChild(clone, btn); //передоставляем колн на кнопку таким образом избавляемся от слушателей событий
  }
}

function closeByEscape(event) {
  //функция закрытия по Escape
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closePopUp(openedPopUp);
  }
}

export { openPopUp, closePopUp };
