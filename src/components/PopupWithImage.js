import Popup from "./Popup";
import { fullPhotoSelector, fullPhotoSubtitleSelector } from "../utils/constants";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullPhoto = this._popupElement.querySelector(fullPhotoSelector);
        this._fullPhotoSubtitle = this._popupElement.querySelector(fullPhotoSubtitleSelector);
    }
    open({src, alt}) {
        this._src = src;
        this._alt = alt;
        this._fullPhoto.setAttribute("src", this._src);
        this._fullPhotoSubtitle.setAttribute("alt", this._alt);

        this._fullPhotoSubtitle.textContent = this._alt;
        super.open();
    }
}