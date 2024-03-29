import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupConfirmation from "../components/PopupConfirmation.js";

import {
  initialContainerSelector,
  profileEditButton,
  photoAddButton,
  popupProfileSelector,
  popupPhotoSelector,
  popupPhotoOpenedSelector,
  formUser,
  formAddPhoto,
  formAvatar,
  objectValidation,
  popupConfirmDeleteSelector,
  popupAvatarSelector,
  avatarEditButton,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  headers: {
    authorization: "a3ec4c90-fa20-46bf-aded-3c42f7d71250",
    "Content-Type": "application/json",
  },
});
//Информация о пользователе
const userInfo = new UserInfo();

//Получение списка карточек
const sectionCards = new Section(initialContainerSelector);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData._id);
    userInfo.setUserAvatar(userData.avatar);
    sectionCards.renderItems({
      items: cardsData,
      renderer: (item) => {
        sectionCards.addItem(createCard(item));
      },
    });
  })
  .catch((err) => {
    console.log(err);
  });

//попап для редактирования профиля
const popupEditProfile = new PopupWithForm(function (params) {
  userInfo.setUserInfo(params);
  return api
    .editUserInfo({
      name: params.name,
      about: params.about,
    })
    .catch((err) => {
      console.log(err);
    });
}, popupProfileSelector);

popupEditProfile.setEventListeners();
profileEditButton.addEventListener("click", () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
});

//попап для добавления фото
const popupAddPhoto = new PopupWithForm(function (params) {
  return api
    .addNewCard({
      name: params.name,
      link: params.link,
    })
    .then((data) => {
      const newCard = createCard(data);
      sectionCards.addNewItem(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}, popupPhotoSelector);

popupAddPhoto.setEventListeners();
photoAddButton.addEventListener("click", () => {
  popupAddPhoto.open();
  photoFormValidator.resetValidation();
});

//Попап для аватара
const popupChangeAvatar = new PopupWithForm(function (params) {
  return api
    .editAvatar(params)
    .then(() => {
      userInfo.setUserAvatar(params.avatar);
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
}, popupAvatarSelector);

popupChangeAvatar.setEventListeners();
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  popupChangeAvatar.open();
});

//попап с фото
const popupOpenedPhoto = new PopupWithImage(popupPhotoOpenedSelector);
popupOpenedPhoto.setEventListeners();

function openPhoto(name, link) {
  popupOpenedPhoto.open({
    src: link,
    alt: name,
  });
}

const popupConfirmDelete = new PopupConfirmation(popupConfirmDeleteSelector);
popupConfirmDelete.setEventListeners();
//Создание карточки
function createCard({ name, link, _id, owner, likes }) {
  const data = {
    name: name,
    link: link,
    myId: userInfo.getUserId(),
    id: _id,
    owner: owner,
    likes: likes,
  };
  const card = new Card(
    data,
    "#card-template",
    openPhoto,
    deletePhoto,
    likePhoto
  );
  const newCard = card.generateCard();
  function deletePhoto() {
    popupConfirmDelete.setHandleFormSubmit(() => {
      api.deleteCard(_id).then(() => {
        card.deleteCard();
      }).catch((err) => {
        console.log(err);
      });
    });
    popupConfirmDelete.open();
  }

  function likePhoto(id, isLiked) {
    if (isLiked) {
      api.removeLike(id).then((data) => {
        card.updateLikesNum(data.likes, data.likes.length);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      api.putLike(id).then((data) => {
        card.updateLikesNum(data.likes, data.likes.length);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  return newCard;
}

const profileFormValidator = new FormValidator(objectValidation, formUser);
profileFormValidator.enableValidation();
const photoFormValidator = new FormValidator(objectValidation, formAddPhoto);
photoFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(objectValidation, formAvatar);
avatarFormValidator.enableValidation();
