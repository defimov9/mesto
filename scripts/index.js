const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const currName = document.querySelector('.profile__name');
const currJob = document.querySelector('.profile__job');
const popupForm = document.querySelector('.popup__form');
const nameField = popupForm.querySelector('#userName-field');
const jobField = popupForm.querySelector('#userJob-field')

const closePopup = () => {
    popup.style.display = 'none';
};

const editProfileData = (event) => {
    event.preventDefault();
    currName.textContent = nameField.value;
    currJob.textContent = jobField.value;
    closePopup();
};

const handleCurrentData = () => {
    popup.style.display = 'block';
    nameField.value = currName.textContent;
    jobField.value = currJob.textContent;
};

editButton.addEventListener('click', handleCurrentData);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', editProfileData);
