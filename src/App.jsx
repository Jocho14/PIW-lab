import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./layout/Main";
import ExplorePage from "./pages/ExplorePage";
import HotelDetailPage from "./pages/HotelDetailPage";
import LogInPage from "./pages/LogInPage";
import ChatPage from "./pages/ChatPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./contexts/CartContext";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<ExplorePage />} />
            <Route path="hotel/:hotelId" element={<HotelDetailPage />} />
          </Route>
          <Route path="signin" element={<LogInPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
