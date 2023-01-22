const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const currName = document.querySelector('.profile__name');
const currJob = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');
const nameField = popupForm.querySelector('.popup__input_type_name');
const jobField = popupForm.querySelector('.popup__input_type_job');

const closeOrOpenPopup = () => {
    popup.classList.toggle('popup_opened');
};

const editProfileData = (event) => {
    event.preventDefault();
    currName.textContent = nameField.value;
    currJob.textContent = jobField.value;
    closeOrOpenPopup();
};

const handleCurrentProfileInfo = () => {
    closeOrOpenPopup();
    nameField.value = currName.textContent;
    jobField.value = currJob.textContent;
};

editButton.addEventListener('click', handleCurrentProfileInfo);
closeButton.addEventListener('click', closeOrOpenPopup);
popupForm.addEventListener('submit', editProfileData);
