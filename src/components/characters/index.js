import React, { useState, useEffect } from "react";
import { useStateValue } from "../../store";

import { getCharacters } from "../../actions";

const Characters = () => {
  const [{ characters }, dispatch] = useStateValue();
  console.log("characters", characters);
  useEffect(() => {
    getCharacters(dispatch);
  }, []);

  return <div> component characters </div>;
};

export default Characters;
