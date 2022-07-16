//Добавление текста ошибки 
function showInputError (formElement, inputElement, errorMassage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMassage;
    errorElement.classList.add(settings.errorElement);
    
};

//Скрытие текста ошибки 
function hideInputError (formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);    
    errorElement.classList.remove(settings.errorElement);
    errorElement.textContent = '';
    
}

//Проверка форм на валидность 
function checkInputValidity (formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else 
    {
        hideInputError(formElement, inputElement, settings);
    }
};

//Если хотя бы 1 инпут не заполнен 
function hasInvalidInput (inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

function toggleButtonState (inputList, buttonElement, settings) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else 
      {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
      }
  }
  
  function setEventListeners (formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputElement));
    const buttonElement = formElement.querySelector(settings.buttonElement);  
    toggleButtonState(inputList, buttonElement, settings);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };
  
function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();        
      });    
    setEventListeners(formElement, settings);
    });
  };  

