import { profileName, profileJob, profileAvatar } from "../utils/constants.js";
export default class UserInfo {
  getUserInfo() {
    return {
      name: profileName.textContent,
      about: profileJob.textContent,
    };
  }

  setUserInfo({name, about}) {
    profileName.textContent = name;
    profileJob.textContent = about;
  }

  setUserAvatar(avatar) {
    profileAvatar.style.backgroundImage = `url(${avatar})`;
  }

  setUserId(id) {
    this._userId = id
  }

  getUserId(){
    return this._userId
  }
}
