export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this._title = profileName;
        this._subtitle = profileJob;
    }

    getUserInfo() {
        return {
            title: this._title.textContent, 
            subtitle: this._subtitle.textContent,            
        }   
    }

    setUserInfo({title, subtitle}) {
        this._title.textContent = title;
        this._subtitle.textContent = subtitle;
    }
}
