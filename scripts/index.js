const elementsContainer = document.querySelector('.elements__container');

const profilePopup = document.querySelector('.profile-popup');
const editButton = document.querySelector('.button_action_edit');
const profileCloseButton = profilePopup.querySelector('.profile-popup__close-btn');

const elementsPopup = document.querySelector('.elements-popup');
const addButton = document.querySelector('.button_action_add');
const elementsCloseButton = elementsPopup.querySelector('.elements-popup__close-btn');

const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const placeInput = document.querySelector('.form__input_type_place');
const linkInput = document.querySelector('.form__input_type_link');

const profileForm = document.querySelector('.form-profile');
const elementForm = document.querySelector('.form-elements');

const imagePopup = document.querySelector('.image-popup');
const imageLink = imagePopup.querySelector('.popup__image');
const imageSubtitle = imagePopup.querySelector('.popup__image-subtitle');
const imageCloseButton = imagePopup.querySelector('.image-popup__close-btn');


import Card from './Card.js';
import FormValidator from './FormValidator.js';


/* Первоначальные карточки*/

const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: './images/image-karachaevo.png'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1617391875568-0871c58f1751?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fCVEMSU4RCVEMCVCQiVEMSU4QyVEMCVCMSVEMSU4MCVEMSU4MyVEMSU4MXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Домбай',
    link: './images/image-dombay.png'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1602256976419-c82585fe73a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFpa2FsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Краснодар',
    link: './images/image-krasnodar.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1556069749-287002c33fa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGthbWNoYXRrYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }
];


/* Открытие-закрытие попапов */

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escHandler);
  popup.addEventListener('mousedown', overlayClickHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escHandler)
  popup.removeEventListener('mousedown', overlayClickHandler)
}


/* Попап картинки */

function openImagePopup(name, link) {
  openPopup(imagePopup);

  imageLink.src = link;
  imageSubtitle.textContent = name;
  imageLink.alt = `картинка ${name}`;
}


/* Добавление карточки */

function addElement(name, link) {
  const card = new Card({name, link}, '#elements-template', openImagePopup);
	const cardElement = card.addElement();

  return cardElement;
}


/* Первоначальные карточки */

initialCards.forEach((item) => {
	elementsContainer.append(addElement(item.name, item.link));
});


/* Profile submit */

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}


/* Elements submit */

function handleElementsFormSubmit (evt) {
  evt.preventDefault();

  elementsContainer.prepend(addElement(placeInput.value, linkInput.value));

  evt.target.reset();

  closePopup(elementsPopup);
}


/* Закрытие Esc */

function escHandler(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}


/* Закрытие кликом на оверлей */

function overlayClickHandler(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened)
  }
}


/* Обработчики */

editButton.addEventListener('click', function (evt) {
  openPopup(profilePopup);
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.setInitialFormState();
});

profileCloseButton.addEventListener('click', function (evt) {
  closePopup(profilePopup)
});

addButton.addEventListener('click', function (evt) {
  openPopup(elementsPopup);
  addFormValidator.setInitialFormState();
});

elementsCloseButton.addEventListener('click', function (evt) {
  closePopup(elementsPopup);
});

imageCloseButton.addEventListener('click', function (evt) {
  closePopup(imagePopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
elementForm.addEventListener('submit', handleElementsFormSubmit);


/* Валидация */

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

const editFormValidator = new FormValidator(profileForm, validationConfig);
const addFormValidator = new FormValidator(elementForm, validationConfig);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
