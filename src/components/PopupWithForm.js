import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(handleFormSubmit, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.form');
        this._popupBtn = this._popupElement.querySelector('.form__submit-button');
        this._inputList = this._popupElement.querySelectorAll('.form__input');
    }

    setInputValues(formValues) {
        this._inputList.forEach(input => input.value = formValues[input.name])
    }

    _getInputValues() {
        const formValues = {}
        this._inputList.forEach(input => formValues[input.name] = input.value);
        return formValues;
    }

    _loadRendering(isLoad) {
        if (isLoad) {
            this._popupBtn.textContent = 'Сохранение...';
        } else {
            this._popupBtn.textContent = 'Сохранить'
        }
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._loadRendering(true);
            this._handleFormSubmit(this._getInputValues())
                .then(() => {
                    this.close();
                    this._loadRendering(false);
                });
        });
        super.setEventListeners();
    }
}