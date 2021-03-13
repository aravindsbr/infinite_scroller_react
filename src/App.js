import './App.css';
import React from "react";
import FetchPosts  from "./components/FetchPosts";

function App() {
  return (
    <React.StrictMode><FetchPosts onlyFavourites="false"/></React.StrictMode>
  );
}

export default App;