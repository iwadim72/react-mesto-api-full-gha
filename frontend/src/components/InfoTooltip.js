import React from "react";
import imgSuccess from '../images/auth-success.svg';
import imgError from '../images/auth-error.svg';
import usePopupClose from "../hooks/usePopupClose";



export default function InfoTooltip({ isOpened, onClose, isError }) {
    const classNamePopup = `popup popup-info-tool ${isOpened ? 'popup_opened' : ''}`
    usePopupClose(isOpened, onClose)

    return (
        <div className={classNamePopup}>
            <div className="popup__container popup__container_type_info-tool">
                <img className="popup-info-tool__img" src={!isError ? imgSuccess : imgError} />
                <h2 className="popup__title popup__title_type_info-tool">{!isError ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                <button className={`popup__close popup__close_type_info-tool`} type='button' onClick={onClose} />
            </div>
        </div>
    )
}