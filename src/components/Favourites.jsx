import React from "react";
import FetchPosts  from "./FetchPosts";

function Favourites() {
  return (
    <React.StrictMode><FetchPosts onlyFavourites="true"/></React.StrictMode>
  );
}

export default Favourites;