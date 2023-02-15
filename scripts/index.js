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
const addPhotoSubmitButton = addPhotoForm.querySelector('.popup__submit');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const hideInputErrors = (popup) => {
  const inputs = popup.querySelectorAll('.popup__input');
  const errors = popup.querySelectorAll('.popup__input-error');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove('popup__input_type_error');
    errors[i].classList.remove('popup__input-error_active');
    errors[i].textContent = '-';
  }
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  hideInputErrors(popup);
  document.removeEventListener('keydown', handleEscPressed);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPressed);
};

const handleEscPressed = (event) => {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

editButton.addEventListener('click', () => {
  handleCurrentProfileInfo();
  openPopup(editProfilePopup);
});

addButton.addEventListener('click', () => {
  addPhotoForm.reset();
  openPopup(addPhotoPopup);
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

const handleCurrentProfileInfo = () => {
  nameField.value = currName.textContent;
  jobField.value = currJob.textContent;
};

const editProfileData = (event) => {
  event.preventDefault();
  currName.textContent = nameField.value;
  currJob.textContent = jobField.value;
  closePopup(editProfilePopup);
};

editProfileForm.addEventListener('submit', editProfileData);

const openImagePopup = (name, link) => {
  imageInPhotoPopup.src = link;
  imageInPhotoPopup.alt = name;
  subtitleInPhotoPopup.textContent = name;
  openPopup(photoPopup);
};

const createCardElement = ({ name, link }) => {
  const cardElement = cardTemplate
    .querySelector('.elements__card')
    .cloneNode(true);
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardImage = cardElement.querySelector('.elements__image');
  const cardLike = cardElement.querySelector('.elements__like');
  const cardRemove = cardElement.querySelector('.elements__remove');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => openImagePopup(name, link));

  cardLike.addEventListener('click', () =>
    cardLike.classList.toggle('elements__like_active')
  );

  cardRemove.addEventListener('click', () => cardElement.remove());

  return cardElement;
};

const addCard = (event) => {
  event.preventDefault();
  const name = titleField.value;
  const link = urlField.value;
  cardsContainer.prepend(createCardElement({ name, link }));
  closePopup(addPhotoPopup);
  addPhotoSubmitButton.disabled = true;
  addPhotoSubmitButton.classList.add('popup__submit_inactive');
};

addPhotoForm.addEventListener('submit', addCard);

const renderInitialCards = (cards) => {
  cards.forEach((card) => cardsContainer.append(createCardElement(card)));
};

renderInitialCards(initialCards);
