export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector(".popup__close-button");
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popupElement.classList.add('popup_is_opened');
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_is_opened');
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
        this._popupElement.addEventListener('mousedown', (event) => this._handleOverlayClose(event));
        this._closeButton.addEventListener('click', (event) => this._handleCloseBtnClick(event))
    }
}
