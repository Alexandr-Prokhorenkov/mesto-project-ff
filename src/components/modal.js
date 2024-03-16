const profile = document.forms["edit-profile"];
const nameInput = profile.name;
const jobInput = profile.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleFormSubmit(evt) {
  evt.preventDefault();
  let userName = nameInput.value;
  let userJob = jobInput.value;
  profileTitle.textContent = userName;
  profileDescription.textContent = userJob;
}

function openPopUp(element) {
  element.classList.add("popup_is-opened");
}

function closePopUp(element) {
  element.classList.remove("popup_is-opened");
}

export {
  handleFormSubmit,
  openPopUp,
  closePopUp,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  profile,
};
