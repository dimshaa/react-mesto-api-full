import { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import auth from '../utils/Auth.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const history = useHistory();
  const [authorizedUser, setAuthorizedUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setAuthorizedUser(user.email)
        history.push('/');
    })
      .catch(err => console.log(err))      
    };
  }, [loggedIn, history]);

  useEffect(() => {
    if (currentUser) {

      api.getInitialCards()
        .then((res) => {
          setCards(res);
          history.push('/');
        })
        .catch(err => console.log(err))
    }
  }, [currentUser, history]);

    useEffect(() => {
    const isLogged = localStorage.getItem('loggedIn');

    if (isLogged) {
      setLoggedIn(true);
      history.push('/')
    }
  }, [history])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.likeCard(card._id, isLiked)
      .then((newCard) => {
        console.log(cards);
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
  };

  function handleAddPlaceSubmit({ name, link }) {
    api.uploadCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  function handleRegisterSubmit({ password, email }) {
    auth.register({ password, email })
    .then(() => {
      setIsSuccess(true);
      setIsInfoTooltipOpen(true);
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    });
  };

  function handleLoginSubmit({ password, email }) {
    auth.authorize({ password, email })
    .then((user) => {
      localStorage.setItem('loggedIn', true);
      setLoggedIn(localStorage.getItem('loggedIn'));
      setAuthorizedUser(user.email);
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    });
  };

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    history.push('sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          loggedIn={loggedIn}
          authorizedUser={authorizedUser}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute exact path="/" 
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit}/>
          </Route>
        </Switch>

        <Footer />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups} 
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser} 
          onClose={closeAllPopups} 
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />

        <PopupWithForm 
          name="confirm"
          title="Вы уверены?"
        />

        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip 
          name="info-tooltip"
          isSuccess={isSuccess}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
