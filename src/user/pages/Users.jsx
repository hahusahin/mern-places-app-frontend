import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const DUMMY_USERS = [
    {
      id: "u1",
      name: "Max",
      image:
        "https://res.cloudinary.com/academind-gmbh/image/upload/f_auto,q_auto:eco/dpr_2.0,w_120,c_lfill,g_center,h_120/v1/academind.com/site/max",
      places: 3,
    },
  ];

  return <UsersList items={DUMMY_USERS} />;
};

export default Users;
