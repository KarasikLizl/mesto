import { profileName, profileJob, profileAvatar } from "../utils/constants.js";
export default class UserInfo {
  getUserInfo() {
    return {
      name: profileName.textContent,
      about: profileJob.textContent,
      // avatar: this._avatar.src
    };
  }

  setUserInfo({name, about}) {
    profileName.textContent = name;
    profileJob.textContent = about;
    // this._avatar.src = data.avatar;
  }
}
