export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;    
    this._formElement = formElement;
    this._inputList =  Array.from(this._formElement.querySelectorAll(this._settings.inputElement));
    this._buttonElement = this._formElement.querySelector(this._settings.buttonElement);  
  }

  //Установщик слушателя
  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {        
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
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
  _hasInvalidInput () {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  _toggleButtonState () {
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else 
      {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
      }
  }
  
  //Отключение кнопки
  disableButton() {
    this._buttonElement.classList.add('form__submit-button_invalid');
    this._buttonElement.setAttribute('disabled', true);
  }

  enableValidation() {      
    this._setEventListeners();
  };
}



