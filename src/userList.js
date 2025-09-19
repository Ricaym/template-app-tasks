import React, { useState, useEffect } from "react";
import api from "./api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    !isMounted &&
      api.getUsers().then((json) => {
        setUsers(json);
        setIsMounted(true);
      });
  }, [isMounted]);

  return (
    <ul>
      {users && users.map((user, index) => {
          return (
            <li key={index}>
              {user.Nom} {user.Prenom}
            </li>
          );
        })}
    </ul>
  );
};

export default UserList;