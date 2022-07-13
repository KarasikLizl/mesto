//Добавление текста ошибки 
function showInputError (formElement, inputElement, errorMassage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMassage;
    errorElement.classList.add('form__input-error_active');
};

//Скрытие текста ошибки 
function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}

//Проверка форм на валидность 
function checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else 
    {
        hideInputError(formElement, inputElement);
    }
};

//Если хотя бы 1 инпут не заполнен 
function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState (inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add('form__submit-button_invalid');
      buttonElement.setAttribute('disabled', true);
    } else 
      {
        buttonElement.classList.remove('form__submit-button_invalid')
        buttonElement.removeAttribute('disabled');
      }
  }
  
  function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit-button');
    
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });    
    setEventListeners(formElement);
    });
  };  
  
  enableValidation({
    formElement: '.form',
    inputElement: '.form__input',
    buttonElement: '.form__submit-button',
    inactiveButtonClass: '.form__submit-button_invalid',
    inputErrorClass: '.form__input-error',
    errorElement: '.form__input-error_active'
  }); 
