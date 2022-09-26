import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setLink('');
    setTitle('');
  }, [props.isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  };

  function handleLinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link
    });
  };

  return (
    <PopupWithForm 
      name="card-add"
      title="Новое место"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        value={title}
        onChange={handleTitleChange}
        className="popup__input popup__input_type_card-name"
        type="text"
        name="cardName"
        placeholder="Название"
        id="card-name-input"
        minLength="2"
        maxLength="30"
        required />
      <span className="popup__input-error" id="card-name-input-error"></span>
      <input
        value={link}
        onChange={handleLinkChange}
        className="popup__input popup__input_type_card-url"
        type="url"
        name="cardUrl"
        placeholder="Ссылка на картинку"
        id="card-url-input"
        required />
      <span className="popup__input-error" id="card-url-input-error"></span>
    </PopupWithForm>

  )
}

export default AddPlacePopup;
