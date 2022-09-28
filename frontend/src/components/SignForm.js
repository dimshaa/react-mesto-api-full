function SignForm({ title, name, onSubmit, buttonText, children, formLoginTip }) {
  return (
    <form 
      className="form"
      name={name}
      onSubmit={onSubmit}
    >
      <h2 className="form__title">{title}</h2>
      {children}
      <button className="form__submit-btn" type="submit">
        {buttonText}
      </button>
      {formLoginTip}
    </form> 
  );
}

export default SignForm;
