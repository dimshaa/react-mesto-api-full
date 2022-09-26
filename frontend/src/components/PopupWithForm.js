function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
        <h2 className="popup__header">{props.title}</h2>
        {props.children}
        <button className="popup__submit-btn" type="submit">Сохранить</button>
        <button className="popup__close-btn" onClick={props.onClose} type="button" aria-label="закрыть не сохраняя"></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
