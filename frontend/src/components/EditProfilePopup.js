import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser && currentUser.name);
    setDescription(currentUser && currentUser.about);
  }, [currentUser, props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        value={name || ""}
        onChange={handleNameChange}
        className="popup__input popup__input_type_username"
        type="text"
        name="userName"
        placeholder="Ваше имя"
        id="username-input"
        minLength="2"
        maxLength="40"
        required />
      <span className="popup__input-error" id="username-input-error"></span>
      <input
        value={description || ""}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_userbio"
        type="text"
        name="userBio"
        placeholder="Чем вы занимаетесь"
        id="userbio-input"
        minLength="2"
        maxLength="200"
        required />
      <span className="popup__input-error" id="userbio-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
