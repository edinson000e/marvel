import React, { useState, useEffect } from "react";
import { useStateValue } from "../../store";
import { getCharacters } from "../../actions";
const Characters = () => {
  let contextType = useStateValue();

  useEffect(() => {
    const [{}, dispatch] = contextType;
    getCharacters(dispatch);
  }, []);

  return <div> component characters </div>;
};

export default Characters;
