import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(handleFormSubmit, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.form');
        this._popupBtn = this._popupSelector.querySelector('.form__submit-button');
        this._inputList = this._popupSelector.querySelectorAll('.form__input');        
    }

    setInputValues(formValues) {
        this._inputList.forEach(input => input.value = formValues[input.name])
    }

    _getInputValues(){
        const formValues = {}
        this._inputList.forEach(input => formValues[input.name] = input.value);
        return formValues;
    }

    close() {
        this._popupForm.reset();
        return super.close();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (event) => {            
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
            
        });
        return super.setEventListeners();
    }
}