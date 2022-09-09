import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".form");
  }

  setHandleFormSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      this._handleFormSubmit();
      event.preventDefault();
      this.close();
    });
    super.setEventListeners();
  }
}
