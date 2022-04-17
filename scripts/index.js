let page = document.querySelector(".page");
let popup = page.querySelector(".popup");
let editProfileButton = page.querySelector(".profile__edit-button")
let closePopupButton = popup.querySelector(".popup__close-button");


function editProfile() {
    popup.classList.toggle("popup_is_opened");
}

editProfileButton.addEventListener("click", editProfile);
closePopupButton.addEventListener("click", editProfile);

let formElement = popup.querySelector(".form");
let nameInput = formElement.querySelector(".form__input_field_username");
let jobInput = formElement.querySelector(".form__input_field_job");


function formSubmitHandler (evt) {
    evt.preventDefault();
    
    let profileName = page.querySelector(".profile__title");
    let profileJob = page.querySelector(".profile__subtitle");

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popup.classList.remove("popup_is_opened");
}

formElement.addEventListener('submit', formSubmitHandler);