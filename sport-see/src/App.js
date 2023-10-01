import "./App.css";
import {
  StatsPanel,
  DailyActivity,
  Header,
  SideBar,
  WelcomeUser,
  AverageSessionDurations,
  HexaMetricsVisualizer,
  GoalAchievement,
} from "./components";
import { useGetUserData } from "./hooks/useGetUserData";

const USER_ID = 12;
function App() {
  const { isLoading, error, data: userData } = useGetUserData(USER_ID);
  let mainContent;
  if (error) {
    console.log(error);
    mainContent = (
      <section className="content-error">
        <div>
          <h1>😵</h1>
          <p>Oups! quelque chose s'est mal passé.</p>
        </div>
      </section>
    );
  } else {
    mainContent = isLoading ? (
      <section className="content-default">
        <h1>Chargement...</h1>
      </section>
    ) : (
      <section className="content">
        <div className="welcome">
          <WelcomeUser name={userData.userInfos.firstName} />
        </div>
        <div className="daily">
          <DailyActivity userId={USER_ID} barWidth={8} />
        </div>
        <div className="infos">
          <StatsPanel data={userData.keyData} />
        </div>
        <div className="duration">
          <AverageSessionDurations userId={USER_ID} />
        </div>
        <div className="data">
          <HexaMetricsVisualizer userId={USER_ID} />
        </div>
        <div className="score">
          <GoalAchievement percentage={userData.todayScore} />
        </div>
      </section>
    );
  }

  return (
    <div className="App">
      <Header />
      <SideBar />
      {mainContent}
    </div>
  );
}

export default App;
