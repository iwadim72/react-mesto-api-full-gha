import React, { useState } from "react";
import { Link } from 'react-router-dom';
import useForm from "../hooks/useForm";


export default function Register({ handleRegister }) {
    const { values, handleChange, setValues } = useForm({});
    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(values);
    }


    return (
        <>
            <form className="auth__form" onSubmit={handleSubmit}>
                <div>
                    <h2 className="auth__title">Регистрация</h2>
                    <label className="auth__field">
                        <input className="auth__input auth__input_content_email" placeholder="Email" name="email" value={values.email || ''} onChange={handleChange}></input>
                    </label>
                    <label className="auth__field">
                        <input className="auth__input auth__input_content_password" type="password" placeholder="Пароль" name="password" value={values.password || ''} onChange={handleChange}></input>
                    </label>
                </div>
                <button type="submit" className="auth__submit">Зарегистрироваться</button>
            </form>
            <p className="auth__signin">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>

        </>
    )
}