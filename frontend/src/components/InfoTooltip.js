import successImage from '../images/popup__success-image.svg';
import failImage from '../images/popup__fail-image.svg';

function InfoTooltip({ name, isSuccess, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
        <div className='popup__container'>
          <img 
            className="popup__status-image"
            src={isSuccess ? successImage : failImage}
            alt={isSuccess ? 'успешная регистрация' : 'что-то пошло не так'}
          />
          <p className="popup__status-title">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
          <button className="popup__close-btn" onClick={onClose} type="button" aria-label="закрыть не сохраняя"></button>
        </div>
    </div>
  );
}

export default InfoTooltip;
