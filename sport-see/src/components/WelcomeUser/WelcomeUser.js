import "./WelcomeUser.css";

export default function WelcomeUser({ name }) {
  return (
    <div className="WelcomeUser">
      <h1>
        Bonjour <span>{name}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}
