import React, { useState, useEffect } from "react";
import { useStateValue } from "../../store";

import { getCharacters } from "../../actions";
import { PageLayout, Card, Grid } from "../common";
const Characters = () => {
  const [{ characters }, dispatch] = useStateValue();
  console.log("characters", characters);
  useEffect(() => {
    getCharacters(dispatch);
  }, []);

  return (
    <PageLayout>
      <Grid>
        {characters.results.length > 0 &&
          characters.results.map((value, index) => {
            console.log(
              "url",
              value.thumbnail.path + "." + value.thumbnail.extension
            );
            return (
              <Card
                key={index}
                title={value.name}
                photo={value.thumbnail.path + "." + value.thumbnail.extension}
                description={value.description}
              />
            );
          })}
      </Grid>
    </PageLayout>
  );
};

export default Characters;
