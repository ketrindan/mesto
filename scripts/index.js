import Card from './Card.js';
import FormValidator from './FormValidator.js';


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
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', handleOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape)
  popup.removeEventListener('mousedown', handleOverlay)
}


/* Попап картинки */

function openImagePopup(name, link) {
  openPopup(imagePopup);

  imageLink.src = link;
  imageSubtitle.textContent = name;
  imageLink.alt = `картинка ${name}`;
}


/* Добавление карточки */

function createCard(name, link) {
  const card = new Card({name, link}, '#elements-template', openImagePopup);
	const cardElement = card.createCard();

  return cardElement;
}


/* Первоначальные карточки */

initialCards.forEach((item) => {
	elementsContainer.append(createCard(item.name, item.link));
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

  elementsContainer.prepend(createCard(placeInput.value, linkInput.value));

  evt.target.reset();

  closePopup(elementsPopup);
}


/* Закрытие Esc */

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}


/* Закрытие кликом на оверлей */

function handleOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}


/* Обработчики */

editButton.addEventListener('click', function (evt) {
  openPopup(profilePopup);
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;

  formValidators['profile-form'].setInitialFormState()
});


profileCloseButton.addEventListener('click', function (evt) {
  closePopup(profilePopup)
});


addButton.addEventListener('click', function (evt) {
  openPopup(elementsPopup);

  formValidators['elements-form'].setInitialFormState()
});


const closeButtons = document.querySelectorAll('.popup__close-btn');

closeButtons.forEach((button) => {

  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
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


const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationConfig);
