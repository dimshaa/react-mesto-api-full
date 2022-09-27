import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm 
      name="avatar-edit"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        ref={avatarRef}
        className="popup__input popup__input_type_avatar-url"
        type="url"
        name="avatarUrl"
        placeholder="Ссылка на картинку"
        id="avatar-url-input"
        required 
      />
      <span className="popup__input-error" id="avatar-url-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
