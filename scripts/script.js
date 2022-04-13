let page = document.querySelector(".page");
let popupContainer = page.querySelector(".popup-container");
let editProfileButton = page.querySelector(".profile__edit-button")
let closePopupButton = popupContainer.querySelector(".popup__close-button");


function editProfile() {
    popupContainer.classList.toggle("popup-container_is_opened");
}

editProfileButton.addEventListener("click", editProfile);
closePopupButton.addEventListener("click", editProfile);

let formElement = popupContainer.querySelector(".form");
let nameInput = formElement.querySelector(".form__input_field_username");
let jobInput = formElement.querySelector(".form__input_field_job");


function formSubmitHandler (evt) {
    evt.preventDefault();
    
    let profileName = page.querySelector(".profile__title");
    let profileJob = page.querySelector(".profile__subtitle");

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupContainer.classList.remove("popup-container_is_opened");
}

formElement.addEventListener('submit', formSubmitHandler);