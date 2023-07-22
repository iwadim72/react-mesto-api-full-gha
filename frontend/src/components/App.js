import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { IsLoadingContext } from '../contexts/IsLoadingContext';
import Login from './Login';
import Register from './Register';
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';



function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoToolTipPopupOpen, setisInfoToolTipPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setisInfoToolTipPopupOpen(false);
        setSelectedCard({});
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleSubmit(request) {
        setIsLoading(true);
        request()
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }


    function handleUpdateUser(info) {
        function makeRequest() {
            return api.setUserInfo(info).then((res) => { setCurrentUser(res.data) });
        }

        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(info) {
        function makeRequest() {
            return api.changeAvatar(info).then((res) => { setCurrentUser(res.data) });
        }

        handleSubmit(makeRequest);
    }

    function handleAddNewCard(newCard) {
        function makeRequest() {
            return api.addNewCard(newCard).then((res) => { setCards([res.data, ...cards]) });
        }

        handleSubmit(makeRequest);
    }

    function changeEmail(email) {
        setEmail(email);
    }

    function handleRegister(values) {
        api.register(values.email, values.password)
            .then((res) => {
                if (res.data.email) {
                    setIsError(false);
                    setisInfoToolTipPopupOpen(true);
                }
            })
            .catch((err) => {
                setIsError(true);
                setisInfoToolTipPopupOpen(true);
            });
    }



    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
            })
            .catch((err) => { console.log(err) })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== card._id))
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const handleLogin = () => {
        setLoggedIn(true);
    }

    const handleTokenCheck = () => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            api.checkToken(jwt).then((res) => {
                if (res) {
                    handleLogin();
                    setEmail(res.data.email);
                    navigate("/", { replace: true })
                }
            });
        }
    }

    React.useEffect(() => {
        if (loggedIn) {
            api.getProfileInfo()
                .then((res) => {
                    setCurrentUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });

            api.getInitialCards()
                .then((res) => {
                    setCards(res.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [loggedIn])

    React.useEffect(() => {
        handleTokenCheck();
    }, [])

    return (
        <IsLoadingContext.Provider value={{ isLoading, closeAllPopups }}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    < Header email={email} />
                    <Routes>
                        <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
                        <Route path="/sign-in" element={<Login handleLogin={handleLogin} changeEmail={changeEmail} />} />
                        <Route path="/" element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <>
                                    < Main
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick}
                                        cards={cards}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete} />
                                    < Footer />
                                </>
                            </ProtectedRoute>
                        } />
                    </Routes>

                </div>
                < EditProfilePopup
                    isOpened={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup
                    isOpened={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} />

                < PopupWithForm name="confirm" buttonText="Да" title="Вы уверены?" />
                <AddPlacePopup
                    isOpened={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddNewCard={handleAddNewCard} />
                < ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <InfoTooltip
                    isOpened={isInfoToolTipPopupOpen}
                    onClose={closeAllPopups}
                    isError={isError}
                />

            </CurrentUserContext.Provider>
        </IsLoadingContext.Provider>

    )
}

export default App;
