import React, { useState, useEffect } from "react";
import { useStateValue } from "../../store";

import { getCharacters } from "../../actions";
import { openModal } from "../../actions/modal";
import { PageLayout, Card, Grid, Modal } from "../common";

const Characters = () => {
  const [{ characters, modal }, dispatch] = useStateValue();

  const [selectCharacter, setselectCharacter] = useState([]);
  useEffect(() => {
    getCharacters(dispatch);
  }, []);

  return (
    <PageLayout>
      <Grid>
        {characters.results.length > 0 &&
          characters.results.map((value, index) => {
            console.log("result", value);
            let title = value.name;
            return (
              <Card
                key={index}
                title={value.name}
                photo={value.thumbnail.path + "." + value.thumbnail.extension}
                description={value.description}
                onClick={() => {
                  let character = {
                    id: value.id,
                    comics: value.comics,
                    title
                  };
                  setselectCharacter(character);
                  dispatch(openModal({ title }));
                }}
              />
            );
          })}
      </Grid>
      <Modal />
    </PageLayout>
  );
};

export default Characters;
