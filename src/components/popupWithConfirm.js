import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitBtn = this._popup.querySelector('.popup__submit');
  }

  setCard(card) {
    this._card = card;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Удаляем...';
    } else {
      this._submitBtn.textContent = 'Да';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleConfirm(this._card);
    });
  }
}
