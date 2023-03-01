const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const photoPopup = document.querySelector('.popup_type_photo');

const imageInPhotoPopup = photoPopup.querySelector('.popup__photo');
const subtitleInPhotoPopup = photoPopup.querySelector('.popup__subtitle');

const editProfileForm = editProfilePopup.querySelector('.popup__form');
const nameField = editProfileForm.querySelector('.popup__input_type_name');
const jobField = editProfileForm.querySelector('.popup__input_type_job');
const currName = document.querySelector('.profile__name');
const currJob = document.querySelector('.profile__job');

const addPhotoForm = addPhotoPopup.querySelector('.popup__form');
const titleField = addPhotoForm.querySelector('.popup__input_type_title');
const urlField = addPhotoForm.querySelector('.popup__input_type_url');

const cardsContainer = document.querySelector('.elements');
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
  popups,
  editProfilePopup,
  addPhotoPopup,
  photoPopup,
  imageInPhotoPopup,
  subtitleInPhotoPopup,
  editProfileForm,
  nameField,
  jobField,
  currName,
  currJob,
  addPhotoForm,
  titleField,
  urlField,
  cardsContainer,
  cardTemplateSelector,
  validationConfig,
  initialCards,
};
