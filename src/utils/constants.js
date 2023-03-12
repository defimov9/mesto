const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const photoPopupSelector = '.popup_type_photo';
const editProfilePopupSelector = '.popup_type_edit-profile';
const addPhotoPopupSelector = '.popup_type_add-photo';

const userNameSelector = '.profile__name';
const userJobSelector = '.profile__job';

const cardsContainer = document.querySelector('.elements');
const cardsContainerSelector = '.elements';
const cardTemplateSelector = '#card-template';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export {
  editButton,
  addButton,
  cardsContainer,
  cardTemplateSelector,
  validationConfig,
  initialCards,
  cardsContainerSelector,
  photoPopupSelector,
  userJobSelector,
  userNameSelector,
  editProfilePopupSelector,
  addPhotoPopupSelector,
};
