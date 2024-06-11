import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../services/init";

import UserSearch from "../../components/UserSearch";
import ChatItem from "../../components/ChatItem";
import Chat from "../../components/Chat";

import "./styles.css";

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [recentChats, setRecentChats] = useState([]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const fetchRecentChats = async () => {
      const currentUserUid = auth.currentUser.uid;
      const messagesRef = collection(firestore, "messages");
      const q = query(messagesRef, where("userId", "==", currentUserUid));
      const querySnapshot = await getDocs(q);

      const chatUsers = new Set();
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        const chatId = messageData.chatId
          .replace(currentUserUid, "")
          .replace("_", "");
        chatUsers.add(chatId);
      });

      const usersRef = collection(firestore, "users");
      const recentChatUsers = [];
      for (const uid of chatUsers) {
        const userSnapshot = await getDocs(
          query(usersRef, where("uid", "==", uid))
        );
        userSnapshot.forEach((userDoc) => {
          recentChatUsers.push(userDoc.data());
        });
      }

      setRecentChats(recentChatUsers);
    };

    fetchRecentChats();
  }, []);

  return (
    <div className="chat-page-container">
      <div className="sidebar">
        <UserSearch onUserSelect={handleUserSelect} />
        <div className="recent-chats">
          <h2>Recent Chats</h2>
          <div className="chat-list">
            {recentChats.map((user) => (
              <ChatItem
                key={user.uid}
                name={user.displayName}
                time=""
                message=""
                onClick={() => handleUserSelect(user)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedUser ? (
        <Chat user={selectedUser} />
      ) : (
        <div className="no-chat-selected">Select a user to start chatting</div>
      )}
      <Link to="/">
        <div className="back-button"></div>
      </Link>
    </div>
  );
}

export default ChatPage;
