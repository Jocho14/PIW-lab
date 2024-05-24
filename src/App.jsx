import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./layout/Main";
import ExplorePage from "./pages/ExplorePage";
import HotelDetailPage from "./pages/HotelDetailPage";
import LogInPage from "./pages/LogInPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<ExplorePage />} />
          <Route path="hotel/:hotelId" element={<HotelDetailPage />} />
          <Route path="signin" element={<LogInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
