export const credentials = {
  baseUrl: 'http://localhost:4000',
  // cohortId: 'cohort-43',
  // token: 'c4f0f8b8-a52c-4e71-bc8a-938ca58bb704'
};

export const authData = {
  baseUrl: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error'
};
