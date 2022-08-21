const elementsContainer = document.querySelector('.elements__container');

const profilePopup = document.querySelector('.profile-popup');
const editButton = document.querySelector('.button_action_edit');
const profileCloseButton = profilePopup.querySelector('.profile-popup__close-btn');

const elementsPopup = document.querySelector('.elements-popup');
const addButton = document.querySelector('.button_action_add');
const elementsCloseButton = elementsPopup.querySelector('.elements-popup__close-btn');

const nameInput = document.querySelector('.input__text_type_name');
const jobInput = document.querySelector('.input__text_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const placeInput = document.querySelector('.input__text_type_place');
const linkInput = document.querySelector('.input__text_type_link');
const elementsPlace = document.querySelector('.elements__title');
const elementsLink = document.querySelector('.elements__image');

const formProfile = document.querySelector('.input-profile');
const formElements = document.querySelector('.input-elements');

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


/*Открытие-закрытие попапов*/

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


/*Добавление карточки*/

function addElement(name, link) {
  const elementsTemplate = document.querySelector('#elements-template').content;
  const elementsItem = elementsTemplate.querySelector('.elements__item').cloneNode(true);

  elementsItem.querySelector('.elements__title').textContent = name;
  elementsItem.querySelector('.elements__image').src = link;
  elementsItem.querySelector('.elements__image').alt = `картинка ${name}`;

  elementsItem.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
});

elementsItem.querySelector('.elements__close-btn').addEventListener('click', function (evt) {
  elementsItem.remove();
});

elementsItem.querySelector('.elements__image').addEventListener('click', function (evt) {
  openPopup(imagePopup);

  imageLink.src = link;
  imageSubtitle.textContent = name;
  imageLink.alt = `картинка ${name}`;
});

  return elementsItem;
}


/*Первоначальные карточки*/

initialCards.forEach(function (element) {
  elementsContainer.append(addElement(element.name, element.link));
});


/*Profile submit*/

function formProfileSubmit (submit) {
  submit.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}


/*Elements submit*/

function formElementsSubmit (submit) {
  submit.preventDefault();

  elementsContainer.prepend(addElement(placeInput.value, linkInput.value));

  placeInput.value = '';
  linkInput.value = '';

  closePopup(elementsPopup);
}


/* Обработчики */

editButton.addEventListener('click', function (evt) {
  openPopup(profilePopup);
  nameInput.value =  profileName.textContent;
  jobInput.value = profileJob.textContent;
});

profileCloseButton.addEventListener('click', function (evt) {
  closePopup(profilePopup);
  nameInput.value = '';
  jobInput.value = '';
});

addButton.addEventListener('click', function (evt) {
  openPopup(elementsPopup);
});

elementsCloseButton.addEventListener('click', function (evt) {
  closePopup(elementsPopup);
  placeInput.value = '';
  linkInput.value = '';
});

imageCloseButton.addEventListener('click', function (evt) {
  closePopup(imagePopup);
});

formProfile.addEventListener('submit', formProfileSubmit);
formElements.addEventListener('submit', formElementsSubmit);
