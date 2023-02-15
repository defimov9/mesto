const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const photoPopup = document.querySelector('.popup_type_photo');
const currName = document.querySelector('.profile__name');
const currJob = document.querySelector('.profile__job');
const nameField = document.querySelector('.popup__input_type_name');
const jobField = document.querySelector('.popup__input_type_job');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
let currPopup, currForm;

const handleCurrentProfileInfo = () => {
  nameField.value = currName.textContent;
  jobField.value = currJob.textContent;
};

const editProfileData = (event) => {
  event.preventDefault();
  currName.textContent = nameField.value;
  currJob.textContent = jobField.value;
  closePopup();
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

  cardImage.addEventListener('click', openPopup);

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('elements__like_active');
  });

  cardRemove.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
};

const addCard = (event) => {
  event.preventDefault();
  const name = currPopup.querySelector('.popup__input_type_title').value;
  const link = currPopup.querySelector('.popup__input_type_url').value;
  if (!name || !link) {
    event.target.querySelector('.popup__submit').disabled = true;
    return;
  }
  cardsContainer.prepend(createCardElement({ name, link }));
  closePopup();
};

const closePopup = () => {
  currForm?.reset();
  currPopup.classList.remove('popup_opened');
};

const openPopup = (event) => {
  currPopup = event.target;
  if (currPopup.classList.contains('profile__edit-button')) {
    currPopup = editProfilePopup;
    handleCurrentProfileInfo();
    currForm = currPopup.querySelector('.popup__form');
    currForm.addEventListener('submit', editProfileData);
  }
  if (currPopup.classList.contains('profile__add-button')) {
    currPopup = addPhotoPopup;
    currForm = currPopup.querySelector('.popup__form');
    currForm.addEventListener('submit', addCard);
  }
  if (currPopup.classList.contains('elements__image')) {
    const photoInfo = currPopup;
    currPopup = photoPopup;
    const photo = photoPopup.querySelector('.popup__photo');
    const photoSubtitle = photoPopup.querySelector('.popup__subtitle');
    photo.src = photoInfo.src;
    photo.alt = photoInfo.alt;
    photoSubtitle.textContent = photoInfo.alt;
  }
  currPopup.classList.add('popup_opened');
  const closeButton = currPopup.querySelector('.popup__close');
  closeButton.addEventListener('click', closePopup);
};

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);

const renderInitialCards = (cards) => {
  cards.forEach((card) => {
    const cardElement = createCardElement(card);
    cardsContainer.append(cardElement);
  });
};

renderInitialCards(initialCards);
