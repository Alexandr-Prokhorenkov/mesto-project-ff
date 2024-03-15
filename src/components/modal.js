import { nameInput, jobInput, profileTitle, profileDescription } from '../index.js'; 

function handleFormSubmit(evt) {
  evt.preventDefault();
  let userName = nameInput.value
  let userJob = jobInput.value
  profileTitle.textContent = userName
  profileDescription.textContent = userJob
}

function openPopUp(element) {
  element.classList.add('popup_is-opened');
}

function closePopUp(element) {
  element.classList.remove('popup_is-opened')
}

function escapeClose(element) {
  window.addEventListener('keyup', function(event){
    if(event.key === 'Escape') {
      if(element.classList.contains('popup_is-opened')) {
        closePopUp(element)
      }
    }
  })
}

function clickClose(element) {
  element.addEventListener('click', function(event){
    if(event.target===element) {
     closePopUp(element)
    }
    })
}

export { handleFormSubmit, openPopUp, closePopUp, escapeClose, clickClose };