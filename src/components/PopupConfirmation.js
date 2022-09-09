import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector) {
		super(popupSelector);
		this._form = this._popupSelector.querySelector(".form");
	}

	setHandleFormSubmit(handleFormSubmit) {
		this._handleFormSubmit = handleFormSubmit;
	}

	setCardId(id) {
		this._cardId = id;
	}

	setEventListeners() {
		this._form.addEventListener("submit", (event) => {
			this._handleFormSubmit(this._cardId);
			event.preventDefault();
			this.close();
		});
		super.setEventListeners();        
	}
}