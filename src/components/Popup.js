export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._closeButton = this._popupSelector.querySelector(".popup__close-button");
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popupSelector.classList.add('popup_is_opened');
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_is_opened');
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleCloseBtnClick() {
        this.close();
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target.classList.contains('popup_is_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (event) => this._handleOverlayClose(event));
        this._closeButton.addEventListener('click', (event) => this._handleCloseBtnClick(event))
    }
}
