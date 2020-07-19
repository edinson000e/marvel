import React, { useState, useEffect } from "react";
import { useStateValue } from "../../store";

import { getCharacters, getDetailsCharacter } from "../../actions";
import { openModal } from "../../actions/modal";
import { PageLayout, Card, Grid, Modal, DetailsCharacter } from "../common";

const Characters = () => {
  const [{ characters, modal }, dispatch] = useStateValue();

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
                  getDetailsCharacter(
                    value.comics.collectionURI,
                    title,
                    dispatch
                  );
                }}
              />
            );
          })}
      </Grid>
      <Modal>
        <DetailsCharacter />
      </Modal>
    </PageLayout>
  );
};

export default Characters;
