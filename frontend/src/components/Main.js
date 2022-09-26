import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser && currentUser.avatar} alt="аватар пользователя" />
        </div>
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__username">{currentUser && currentUser.name}</h1>
            <button className="profile__edit-btn" onClick={props.onEditProfile} type="button" aria-label="редактировать профиль"></button>
          </div>
          <p className="profile__userbio">{currentUser && currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace} type="button" aria-label="добавить фото"></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card) => (
              <Card 
                key= {card._id}
                cardData={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
