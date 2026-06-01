import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategorySelect from "./pages/CategorySelect";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Lobby from "./pages/Lobby";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game";
import ProfilePage from "./pages/ProfilePage";
import OnlinePage from "./pages/OnlinePage";
import MultiplayerGame from "./pages/MultiplayerGame";
import SplashScreen from "./components/SplashScreen";
import AchievementToast from "./components/AchievementToast";
import { applyTheme, getSavedThemeId, applyColorblindMode, getSavedColorblindMode } from "./utils/theme";

/* SVG color-matrix filters for colorblind simulation */
function ColorblindFilters() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter id="cb-protanopia">
          <feColorMatrix type="matrix" values="
            0.567 0.433 0.000 0 0
            0.558 0.442 0.000 0 0
            0.000 0.242 0.758 0 0
            0     0     0     1 0" />
        </filter>
        <filter id="cb-deuteranopia">
          <feColorMatrix type="matrix" values="
            0.625 0.375 0.000 0 0
            0.700 0.300 0.000 0 0
            0.000 0.300 0.700 0 0
            0     0     0     1 0" />
        </filter>
        <filter id="cb-tritanopia">
          <feColorMatrix type="matrix" values="
            0.950 0.050 0.000 0 0
            0.000 0.433 0.567 0 0
            0.000 0.475 0.525 0 0
            0     0     0     1 0" />
        </filter>
      </defs>
    </svg>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    applyTheme(getSavedThemeId());
    applyColorblindMode(getSavedColorblindMode());
  }, []);

  return (
    <>
      <ColorblindFilters />
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <AchievementToast />

      <BrowserRouter>
        <Routes>
          <Route path="/"            element={<HomePage />}      />
          <Route path="/solo"        element={<CategorySelect />} />
          <Route path="/create-room" element={<CreateRoom />}    />
          <Route path="/join-room"   element={<JoinRoom />}      />
          <Route path="/lobby"       element={<Lobby />}         />
          <Route path="/leaderboard" element={<Leaderboard />}   />
          <Route path="/game"        element={<Game />}          />
          <Route path="/profile"           element={<ProfilePage />}     />
          <Route path="/online"            element={<OnlinePage />}      />
          <Route path="/multiplayer-game"  element={<MultiplayerGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
