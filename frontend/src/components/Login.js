import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import api from "../utils/Api";

export default function Login({ handleLogin, changeEmail }) {
    const { values, handleChange, setValues } = useForm({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        api.authorize(values.email, values.password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setValues({ email: '', password: '' });
                    changeEmail(values.email);
                    handleLogin();
                    navigate('/', { replace: true });
                }
            })
            .catch(console.error);
    }

    return (
        <form className="auth__form" onSubmit={handleSubmit}>
            <div>
                <h2 className="auth__title">Вход</h2>
                <label className="auth__field">
                    <input className="auth__input auth__input_content_email" placeholder="Email" name="email" value={values.email || ''} onChange={handleChange}></input>
                </label>
                <label className="auth__field">
                    <input className="auth__input auth__input_content_password" type="password" placeholder="Пароль" name="password" value={values.password || ''} onChange={handleChange}></input>
                </label>
            </div>
            <button type="submit" className="auth__submit">Войти</button>
        </form>
    )
}