export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscPressed);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscPressed);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}