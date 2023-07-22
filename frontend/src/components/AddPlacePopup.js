import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";
import { IsLoadingContext } from "../contexts/IsLoadingContext";


function AddPlacePopup(props) {
    const { values, handleChange, setValues } = useForm({});
    const isLoading = React.useContext(IsLoadingContext)

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddNewCard({
            name: values.name,
            link: values.link
        });
    }

    React.useEffect(() => {
        setValues({ name: '', link: '' })
    }, [props.isOpened])

    return (
        < PopupWithForm
            name="add-place"
            buttonText={isLoading.isLoading ? 'Создание...' : 'Создать'}
            title="Новое место"
            isOpened={props.isOpened}
            onClose={props.onClose}
            onSubmit={handleSubmit}>

            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_place-name" type="text"
                    placeholder="Название" id="place-name" name='name' minLength="2" maxLength="30" required value={values.name || ''} onChange={handleChange} />
                <span className="popup__erorr place-name-error"></span>
            </label>
            <label className="popup__field">
                <input className="popup__text-input popup__text-input_content_place-url" type="url"
                    placeholder="Ссылка на картинку" id="place-url" name='link' required values={values.link || ''} onChange={handleChange} />
                <span className="popup__erorr place-url-error"></span>
            </label>

        </PopupWithForm>
    )
}

export default AddPlacePopup;