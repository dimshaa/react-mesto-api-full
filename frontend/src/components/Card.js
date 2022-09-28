import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  console.log(props.cardData);
  const isOwn = props.cardData.owner === currentUser._id;
  const cardDeleteBtnClassName = (`card__delete-btn ${!isOwn && 'card__delete-btn_hidden'}`);
  
  const isLiked = props.cardData.likes.some(i => i === currentUser._id);
  const cardLikeBtnClassName = (`card__like-btn ${isLiked && 'card__like-btn_active'}`)

  function handleClick() {
    props.onCardClick(props.cardData);
  }

  function handleLikeClick() {
    props.onCardLike(props.cardData);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.cardData);
  }

  return (
    <li className="card">
      <img className="card__image" onClick={handleClick} src={props.cardData.link} alt={props.cardData.name} />
      <div className="card__info">
        <h2 className="card__caption">{props.cardData.name}</h2>
        <div className="card__like-wrapper">
          <button className={cardLikeBtnClassName} onClick={handleLikeClick} type="button" aria-label="мне нравится"></button>
          <p className="card__like-counter">{props.cardData.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteBtnClassName} onClick={handleDeleteClick} type="button" aria-label="удалить"></button>
    </li>
  );
}

export default Card;
