import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import ChatBubble from "../../components/ChatBubble";

const Main = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <ChatBubble />
      <Footer />
    </main>
  );
};

export default Main;
