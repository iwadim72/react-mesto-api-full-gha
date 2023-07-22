import React from 'react';
import headerLogo from '../images/logo.svg';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';



function Header({ email }) {
    const navigate = useNavigate();

    function signOut() {
        localStorage.removeItem('jwt');
        navigate("/sign-in", { replace: true })
    }

    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип Место" className="header__logo" />
            <Routes>
                <Route path="/sign-up" element={<Link to="/sign-in" replace className="header__link">Войти</Link>} />
                <Route path="/sign-in" element={<Link to="/sign-up" replace className="header__link">Регистрирация</Link>} />
                <Route path="/" element={
                    <div className='header__container'>
                        <p className='header__email'>{email}</p>
                        <button className="header__button" onClick={signOut}>Выйти</button>
                    </div>
                } />
            </Routes>
        </header>
    );
}

export default Header;