import React from "react";
import { createServer } from "miragejs";
import { useQuery } from "react-query";
import axios from "axios";

createServer({
  routes() {
    this.routes = 1000;
    this.get(
      "/api/users",
      () => [
        { id: "1", name: "PB" },
        { id: "2", name: "Pranav" },
        { id: "3", name: "Kumar" },
      ],
      { timing: 750 }
    );
  },
});

const getUsersApi = async () => {
  const data = await axios.get("/api/users");
  return data?.data || ["No Users"];
};

function App() {
  const { data, isFetching, status, isLoading } = useQuery(
    "getUsers",
    getUsersApi
  );

  if (status === "loading" || isFetching || isLoading) {
    return "Loading....";
  }

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default App;
