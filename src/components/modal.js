function openPopUp(element) {//функция открытия модального окна
  element.classList.add("popup_is-opened");
  document.addEventListener('keydown', closeByEscape)
}

function closePopUp(element) {//функция закрытия модального окна
  element.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeByEscape)
}

function closeByEscape(event) {//функция закрытия по Escape
    if (event.key === "Escape") {
      const openedPopUp = document.querySelector(".popup_is-opened");
        closePopUp(openedPopUp);
    }
  }

export {
  openPopUp,
  closePopUp,
};