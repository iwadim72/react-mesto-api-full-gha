import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";
import { IsLoadingContext } from "../contexts/IsLoadingContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isLoading = React.useContext(IsLoadingContext);
    const { values, handleChange, setValues } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    React.useEffect(() => {
        setValues({ ...values, name: currentUser.name, about: currentUser.about })
    }, [currentUser, props.isOpened]);


    return (
        < PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpened={props.isOpened}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={isLoading.isLoading ? 'Сохранение...' : 'Сохранить'}>


            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_name" type="text" placeholder="Имя"
                    id="name-input" name="name" minLength="2" maxLength="40" required value={values.name || ''} onChange={handleChange} />
                <span className="popup__erorr name-input-error"></span>
            </label>
            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_job" type="text" placeholder="Описание"
                    id="job-input" name="about" minLength="2" maxLength="200" required value={values.about || ''} onChange={handleChange} />
                <span className="popup__erorr job-input-error"></span>
            </label>

        </PopupWithForm>)
}

export default EditProfilePopup;