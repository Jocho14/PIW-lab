import "./styles.css";

const ChatItem = (props) => {
  return (
    <div className="chat-item" onClick={props.onClick}>
      <div className="chat-info">
        <div className="chat-name">{props.name}</div>
        <div className="chat-time">{props.time}</div>
      </div>
      <div className="chat-message">{props.message}</div>
    </div>
  );
};

export default ChatItem;
