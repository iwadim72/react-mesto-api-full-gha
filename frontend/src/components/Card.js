import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id)
    const cardLikeButtonclassName = (
        `places__like ${isLiked && 'places__like_active'}`
    )

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLike() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="places__element">
            <div className="places__photo" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}></div>
            <div className="places__name-container">
                <h3 className="places__name">{props.card.name}</h3>
                <div className="places__like-container">
                    <button className={cardLikeButtonclassName} onClick={handleLike} type="button"></button>
                    <p className="places__like-counter">{props.card.likes.length}</p>
                </div>
                {isOwn && <button className="places__delete" type="button" onClick={handleCardDelete}></button>}
            </div>
        </li>
    )
}

export default Card;