let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button_action_edit');
let closeButton = popup.querySelector('.popup__close-btn');

let nameInput = document.querySelector('.input__text_type_name');
let jobInput = document.querySelector('.input__text_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.setAttribute('placeholder', profileName.innerText);
  jobInput.setAttribute('placeholder', profileJob.innerText);
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
}

closeButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.input');

function formSubmitHandler (submit) {
  submit.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
