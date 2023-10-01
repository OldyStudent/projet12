import "./StatsPanel.css";
import energyIcon from "../../assets/icons/energy.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import appleIcon from "../../assets/icons/apple.svg";
import burgerIcon from "../../assets/icons/cheeseburger.svg";

export default function StatsPanel({ data }) {
  return (
    <div className="StatsPanel">
      <article>
        <div className="stats-panel__img-container bg-red">
          <img src={energyIcon} alt="calories icon" />
        </div>
        <div className="stats-panel__details">
          <h2>{data.calorieCount}kCal</h2>
          <p>Calories</p>
        </div>
      </article>

      <article>
        <div className="stats-panel__img-container bg-blue">
          <img src={chickenIcon} alt="Protéines icon" />
        </div>
        <div className="stats-panel__details">
          <h2>{data.proteinCount}g</h2>
          <p>Protéines</p>
        </div>
      </article>

      <article>
        <div className="stats-panel__img-container bg-yellow">
          <img src={appleIcon} alt="Glucides icon" />
        </div>
        <div className="stats-panel__details">
          <h2>{data.carbohydrateCount}g</h2>
          <p>Glucides</p>
        </div>
      </article>

      <article>
        <div className="stats-panel__img-container bg-pink">
          <img src={burgerIcon} alt="Lipides icon" />
        </div>
        <div className="stats-panel__details">
          <h2>{data.lipidCount}g</h2>
          <p>Lipides</p>
        </div>
      </article>
    </div>
  );
}
