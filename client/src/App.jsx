import { useState } from "react";
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

export default function App() {
  const [splash, setSplash] = useState(true);

  return (
    <>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}

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
