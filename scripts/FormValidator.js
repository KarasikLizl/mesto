export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;    
    this._formElement = formElement;
  }

  //Установщик слушателя
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputElement));
    const buttonElement = this._formElement.querySelector(this._settings.buttonElement);  
    this._toggleButtonState(inputList, buttonElement);
    const current = this;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {        
        current._checkInputValidity(inputElement);
        current._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  //Добавление текста ошибки 
  _showInputError (inputElement, errorMassage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMassage;
    errorElement.classList.add(this._settings.errorElement);    
  };

  //Скрытие текста ошибки 
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);    
    errorElement.classList.remove(this._settings.errorElement);
    errorElement.textContent = '';    
  }

  //Проверка форм на валидность 
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else 
    {
        this._hideInputError(inputElement);
    }
  };

  //Если хотя бы 1 инпут не заполнен 
  _hasInvalidInput (inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

  _toggleButtonState (inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else 
      {
        buttonElement.classList.remove(this._settings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
      }
  }

  enableValidation() {      
    this._setEventListeners();    
  };
}



