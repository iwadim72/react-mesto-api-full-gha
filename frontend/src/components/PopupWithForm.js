import React, { useContext } from "react";
import usePopupClose from "../hooks/usePopupClose";
import { IsLoadingContext } from "../contexts/IsLoadingContext";


function PopupWithForm({ isOpened, onClose, name, title, onSubmit, buttonText, children }) {
    const className = `popup popup_type_${name} ${isOpened ? 'popup_opened' : ''}`
    const isLoading = useContext(IsLoadingContext);
    usePopupClose(isOpened, onClose)

    return (
        <div className={className}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__submit" type='submit' disabled={isLoading.isLoading} >{buttonText}</button>
                </form>
                <button className={`popup__close popup__close_type_${name}`} type='button' onClick={onClose} />
            </div>
        </div >
    )
}

export default PopupWithForm;