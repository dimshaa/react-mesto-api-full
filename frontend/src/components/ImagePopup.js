function ImagePopup(props) {
  return (
    <div className={`popup popup_darkened popup_type_card-view ${props.card && "popup_opened"}`}>
      <div className="popup__card-container">
        <img className="popup__card-image" src={props.card && props.card.link} alt={props.card && props.card.name} />
        <p className="popup__card-caption">{props.card && props.card.name}</p>
        <button className="popup__close-btn" onClick={props.onClose} type="button" aria-label="закрыть не сохраняя"></button>
      </div>
    </div>
  );
}

export default ImagePopup;
