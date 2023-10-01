import "./Header.css";
import logo from "../../assets/images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo sport see" />

      <nav>
        <ul className="header__menu">
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/profil">Profil</a>
          </li>
          <li>
            <a href="/settings">Réglage</a>
          </li>
          <li>
            <a href="/community">Communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
