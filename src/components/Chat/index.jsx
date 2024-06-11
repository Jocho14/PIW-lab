import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { firestore, auth } from "../../services/init";

import sendIcon from "../../assets/send-icon.svg";
import "./styles.css";

const generateChatId = (userId1, userId2) => {
  return [userId1, userId2].sort().join("_");
};

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!user) return;

    const chatId = generateChatId(auth.currentUser.uid, user.uid);
    const q = query(
      collection(firestore, "messages"),
      orderBy("timestamp", "asc"),
      where("chatId", "==", chatId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      try {
        await addDoc(collection(firestore, "messages"), {
          text: input,
          timestamp: new Date(),
          userId: auth.currentUser.uid,
          chatId: generateChatId(auth.currentUser.uid, user.uid),
        });
        console.log("Message sent: ", input);
        setInput("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="contact-name">Chat with {user.displayName}</div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.userId === auth.currentUser.uid
                ? "message sent"
                : "message received"
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message here..."
          />
          <button type="submit">
            <img className="send-icon" src={sendIcon} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
