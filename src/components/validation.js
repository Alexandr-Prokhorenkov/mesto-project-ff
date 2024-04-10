const latinCyrillicRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;

function isValidInput(inputValue, inputElement) {
  if (inputElement.type === "url") {
    // Проверяем, является ли элемент типом 'url'
    const errorMessage = inputElement.dataset.errorMessage; // Получаем сообщение об ошибке из data-атрибута
    return inputElement.validity.valid ? true : errorMessage; // Возвращаем true или сообщение об ошибке
  }
  return latinCyrillicRegex.test(inputValue);
}

const hasInvalidInput = (inputList) => {
  //проверка валидного значения инпута возвращ true или false
  return inputList.some((inputElement) => {
    return (
      !inputElement.validity.valid ||
      !isValidInput(inputElement.value, inputElement)
    );
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  //функция переключателя состояния кнопки
  if (hasInvalidInput(inputList)) {
    //если значение во всех инпутах валидно
    buttonElement.classList.add(validationConfig.inactiveButtonClass); //прибавляем класс неактивной кнопки
    buttonElement.setAttribute("disabled", "true"); // добавляем атрибут disabled
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass); //удаляем класс неактивной кнопки
    buttonElement.removeAttribute("disabled"); // удаляем атрибут disabled
  }
};

function hideInputError(formElement, inputElement, validationConfig) {
  //функция удаления вывода ошибок
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`); //находим спаны по классам
  inputElement.classList.remove(validationConfig.inputErrorClass); //удаляем классы с ошибками для инпута
  errorElement.classList.remove(validationConfig.errorClass); //удаляем классы с ошибкой из спанов
  errorElement.textContent = ""; //удаляем текст из спанов
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  //функция показа ошибки
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`); //для каждой формы находим класс обознач ошибку
  inputElement.classList.add(validationConfig.inputErrorClass); //присваиваем этот класс инпутам
  errorElement.textContent = errorMessage || inputElement.dataset.errorMessage; //текст из метода inputElement.validationMessage передаем в спан
  errorElement.classList.add(validationConfig.errorClass); //присваиваем этот класс спанам
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  //функция проверки валидности
  const customErrorMessage = inputElement.dataset.errorMessage;
  if (inputElement.value && !isValidInput(inputElement.value, inputElement)) {
    //если не валидно
    showInputError(
      formElement,
      inputElement,
      customErrorMessage,
      validationConfig
    ); //запускаем функцию показа ошибки
  } else if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig); //если валидно снимаем показ ошибок
  }
}

const setEventListeners = (formElement, validationConfig) => {
  //создаем функцию слушателей событий
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  ); //создаем массив из всех инпутов формы
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  ); //ищем кнопки в формах
  toggleButtonState(inputList, buttonElement, validationConfig); //выполняем функцию переключателя состояния кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      //по всем инпутам вешаем слушатель на изменение ввода
      checkInputValidity(formElement, inputElement, validationConfig); //запускаем функцию проверки валидности
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export function enableValidation(validationConfig) {
  //создаем функцию валидации форм
  const formList = document.querySelectorAll(validationConfig.formSelector); //делаем массив из всех форм на странице
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      //вешаем слушатель на элементы
      evt.preventDefault(); //отменяем поведение по умолчанию
    });
    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(formElement, validationConfig) {
  //ощищаем инпуты от классов ошибиок и сообщений об ошибках
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  ); // создаем массив из всех инпутов формы
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  ); // ищем кнопку в форме

  inputList.forEach((element) => {
    const errorElement = formElement.querySelector(`.${element.name}-error`); //ищем спаны
    if (
      errorElement &&
      errorElement.classList.contains(validationConfig.errorClass)
    ) {
      errorElement.classList.remove(validationConfig.errorClass);
      errorElement.textContent = ""; // очищаем текст ошибки
    }
    if (element.classList.contains(validationConfig.inputErrorClass)) {
      element.classList.remove(validationConfig.inputErrorClass);
    }
  });

  if (buttonElement.classList.contains(validationConfig.inactiveButtonClass)) {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
}

