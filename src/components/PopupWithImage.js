import Popup from "./Popup";
import { fullPhoto, fullPhotoSubtitle } from "../utils/constants";

export default class PopupWithImage extends Popup {
    constructor( popupSelector) {
        super(popupSelector);
    }
    open({src, alt}) {
        this._src = src;
        this._alt = alt;
        const image = this._popupSelector.querySelector(fullPhoto);
        image.setAttribute("src", this._src);
        image.setAttribute("alt", this._alt);

        const subtitle = this._popupSelector.querySelector(fullPhotoSubtitle);
        subtitle.textContent = this._alt;
        super.open();
    }
}