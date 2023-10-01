import "./SideBar.css";
import iconYoga from "../../assets/icons/yoga.svg";
import iconSwimming from "../../assets/icons/natation.svg";
import iconCycling from "../../assets/icons/cyclisme.svg";
import iconBodyBuilding from "../../assets/icons/musculation.svg";
export default function SideBar() {
  return (
    <aside className="sidebar">
      <p>Copyright, SportSee 2020</p>
      <div className="sidebar__activities">
        <img src={iconYoga} alt="icone activité yoga" />
        <img src={iconSwimming} alt="icone activité natation" />
        <img src={iconCycling} alt="icone activité cyclisme" />
        <img src={iconBodyBuilding} alt="icone activité musculation" />
      </div>
    </aside>
  );
}
