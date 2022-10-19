import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


import cherkessImage from '../images/image-karachaevo.png';
import dombayImage from '../images/image-dombay.png';
import krasnodarImage from '../images/image-krasnodar.jpg';


const editButton = document.querySelector('.button_action_edit');
const addButton = document.querySelector('.button_action_add');


/* Первоначальные карточки*/

const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: cherkessImage
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1617391875568-0871c58f1751?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fCVEMSU4RCVEMCVCQiVEMSU4QyVEMCVCMSVEMSU4MCVEMSU4MyVEMSU4MXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Домбай',
    link: dombayImage
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1602256976419-c82585fe73a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFpa2FsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Краснодар',
    link: krasnodarImage
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1556069749-287002c33fa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGthbWNoYXRrYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }
];



/* Все для попапов */

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const profilePopup = new PopupWithForm('.profile-popup', (inputValueList) =>
  userInfo.setUserInfo(inputValueList.name, inputValueList.job)
);

const elementsPopup = new PopupWithForm('.elements-popup', (inputValueList) => {
  сardsList.addItem(createCard(inputValueList.place, inputValueList.link))
});

const imagePopup = new PopupWithImage('.image-popup');

profilePopup.setEventListeners();

elementsPopup.setEventListeners();

imagePopup.setEventListeners();



/* Отрисовка карточек */

function createCard(name, link) {
  const card = new Card({name, link}, '#elements-template', imagePopup.open.bind(imagePopup));
	const cardElement = card.createCard();

  return cardElement
}


const сardsList = new Section({ items: initialCards, renderer: (item) => {const card = new Card(item, '#elements-template', imagePopup.open.bind(imagePopup));

      const cardElement = card.createCard();

      сardsList.addItem(cardElement);}},
'.elements__container');

сardsList.renderItems()



/* Обработчики кнопок*/

editButton.addEventListener('click', function (evt) {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());

  formValidators['profile-form'].setInitialFormState()
});


addButton.addEventListener('click', function (evt) {
  elementsPopup.open();

  formValidators['elements-form'].setInitialFormState();
});



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

const handleValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

handleValidation(validationConfig);
