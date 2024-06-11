import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../services/init";

import ChatItem from "../ChatItem";
import { useDebounce } from "../../hooks/useDebounce";

import "./styles.css";

const UserSearch = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const usersData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = users.filter((user) =>
        user.displayName
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [debouncedSearchTerm, users]);

  return (
    <div className="search-section">
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search or start a new chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {debouncedSearchTerm && (
        <div className="search-results">
          {filteredUsers.map((user) => (
            <ChatItem
              key={user.uid}
              name={user.displayName}
              time=""
              message=""
              onClick={() => onUserSelect(user)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
