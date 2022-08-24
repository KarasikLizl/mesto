import Popup from "./Popup";
import { fullPhoto, fullPhotoSubtitle } from "../utils/constants";

export default class PopupWithImage extends Popup {
    constructor( popupSelector) {
        super(popupSelector);
    }
    open({src, alt}) {
        this._src = src;
        this._alt = alt;
        fullPhoto.setAttribute("src", this._src);
        fullPhoto.setAttribute("alt", this._alt);

        fullPhotoSubtitle.textContent = this._alt;
        super.open();
    }
}