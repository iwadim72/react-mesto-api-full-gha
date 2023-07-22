import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function ImagePopup(props) {

    const className = `popup-photo popup ${props.card.name ? 'popup_opened' : ''}`;
    usePopupClose(props.card.link, props.onClose)

    return (
        <div className={className}>
            <div className="popup-photo__container">
                <figure className="popup-photo__figure">
                    <img className="popup-photo__capture" alt={props.card ? `${props.card.name}` : ''} src={props.card ? `${props.card.link}` : ''} />
                    <figcaption className="popup-photo__capture-name">{props.card ? `${props.card.name}` : ''}</figcaption>
                </figure>
                <button className="popup__close popup__close_place_photo" type="button" onClick={props.onClose}></button>
            </div >
        </div >
    )
}

export default ImagePopup;