const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const currName = document.querySelector('.profile__name');
const currJob = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');
const nameField = popupForm.querySelector('.popup__input_type_name');
const jobField = popupForm.querySelector('.popup__input_type_job');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const closeOrOpenPopup = () => {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    handleCurrentProfileInfo();
  }
};

const editProfileData = (event) => {
  event.preventDefault();
  currName.textContent = nameField.value;
  currJob.textContent = jobField.value;
  closeOrOpenPopup();
};

const handleCurrentProfileInfo = () => {
  nameField.value = currName.textContent;
  jobField.value = currJob.textContent;
};

editButton.addEventListener('click', closeOrOpenPopup);
closeButton.addEventListener('click', closeOrOpenPopup);
popupForm.addEventListener('submit', editProfileData);

const createCardElement = ({ name, link }) => {
  const cardElement = cardTemplate
    .querySelector('.elements__card')
    .cloneNode(true);
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardImage = cardElement.querySelector('.elements__image');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
};

const renderInitialCards = (cards) => {
  cards.forEach((card) => {
    const cardElement = createCardElement(card);
    cardsContainer.append(cardElement);
  });
};

renderInitialCards(initialCards);
