import React, { useState, useEffect } from "react";
import { useStateValue } from "../../store";

import { getCharacters } from "../../actions";
import { PageLayout } from "../common";
const Characters = () => {
  const [{ characters }, dispatch] = useStateValue();
  console.log("characters", characters);
  useEffect(() => {
    getCharacters(dispatch);
  }, []);

  return (
    <PageLayout>
      <div> component characters </div>
    </PageLayout>
  );
};

export default Characters;
