import React, { useEffect, useState } from "react";
import { DetailsCharacter } from "../common";
import { useStateValue } from "../../store";

const SelectCharacter = () => {
  const [{ character }, dispatch] = useStateValue();
  useEffect(() => {
    console.log("characater", character);
    return () => {};
  }, [character]);

  const suspensionPoints = (text, limit) => {
    let points = "...";
    if (text && text.length > limit) {
      limit = text.indexOf(" ", limit);
      text = text.substring(0, limit + 1) + points;
    } else if (!text) {
      text = "There is no description.";
    }
    return text;
  };

  return (
    <div>
      {character.results.length > 0 &&
        character.results.map((value, index) => {
          return (
            <DetailsCharacter
              key={index}
              title={value.title}
              url={value.thumbnail.path + "." + value.thumbnail.extension}
              description={suspensionPoints(value.description, 150)}
            />
          );
        })}
      {character.isFetching && <p> cargando </p>}
    </div>
  );
};

export default SelectCharacter;
