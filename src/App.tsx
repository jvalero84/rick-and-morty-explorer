import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyles } from "./styles/Globalstyles.styles";
import { Header } from "./components/Header";
import { CharactersPage } from "./pages/CharactersPage";
import { EpisodesPage } from "./pages/EpisodesPage";
import { LocationsPage } from "./pages/LocationsPage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";
import { EpisodeDetailPage } from "./pages/EpisodeDetailPage";
import { LocationDetailPage } from "./pages/LocationDetailPage";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
          <Route path="/locations/:id" element={<LocationDetailPage />} />
          <Route path="*" element={<Navigate to="/characters" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
