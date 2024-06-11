import { Link } from "react-router-dom";

import "./styles.css";

const ChatBubble = () => {
  return (
    <Link to="/chat">
      <div className="chat-bubble"></div>;
    </Link>
  );
};

export default ChatBubble;
