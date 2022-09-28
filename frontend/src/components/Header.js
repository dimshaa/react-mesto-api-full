import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg'

function Header( { loggedIn, authorizedUser, onSignOut } ) {
  const currentPath = useLocation();

  return (
    <header className="header">
      <img className="logo" src={logo} alt="логотип" />
      <div className="header__navigation">
        {loggedIn ? (
          <>
            <p className="header__user-info">{authorizedUser}</p>
            <button className="header__logout-btn" onClick={onSignOut}>Выйти</button>
          </>)
          :
          ((() => {switch (currentPath.pathname) {
            case "/sign-in":
              return (<Link className="link" to="/sign-up">Регистрация</Link>);
            case "/sign-up":
              return (<Link className="link" to="/sign-in">Войти</Link>)
          }})()
        )}
      </div>
    </header>
  );
}

export default Header;
