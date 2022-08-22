import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor({src, alt}, popupSelector) {
        super(popupSelector);
        this._src = src;
        this._alt = alt;
    }
    open() {
        const image = this._popupSelector.querySelector('.popup__big-photo');
        image.setAttribute("src", this._src);
        image.setAttribute("alt", this._alt);

        const subtitle = this._popupSelector.querySelector('.popup__subtitle');
        subtitle.textContent = this._alt;

        return super.open();
    }
}