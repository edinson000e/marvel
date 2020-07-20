import React, { useEffect, useState } from "react";
import { PageLayout, CommonDetailsCharacter } from "../common";
import { useStateValue } from "../../store";

let options = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
export const DetailsCharacter = props => {
  const [{ character }, dispatch] = useStateValue();

  const [creator, setcreator] = useState([]);
  useEffect(() => {
    /*console.log("props.match.params.id", props.match.params.id);
       console.log("character", character);
     */

    let role = [];

    if (
      character.dataSelect &&
      character.dataSelect.creators &&
      character.dataSelect.creators.items &&
      character.dataSelect.creators.items.length > 0
    ) {
      if (role.length === 0) {
        var today = new Date(character.dataSelect.dates[0].date);

        role.push({
          item: "Published",
          name: today.toLocaleDateString("en-US", options)
        });
      }
      character.dataSelect.creators.items.map((creator, index) => {
        let resultFilter = -1;
        if (role.length > 0) {
          resultFilter = role.findIndex(value => {
            return value.item === creator.role;
          });
        }

        if (role.length === 0 || resultFilter === -1) {
          role.push({
            item: creator.role,
            name: [creator.name]
          });
        } else {
          role[resultFilter].name.push(creator.name);
        }
      });
      setcreator(role);
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <PageLayout>
      {Object.entries(character.dataSelect).length === 0 ? (
        "Loading"
      ) : (
        <CommonDetailsCharacter
          title={character.dataSelect.title}
          url={
            character.dataSelect.thumbnail.path +
            "." +
            character.dataSelect.thumbnail.extension
          }
          subTitle={creator}
          description={character.dataSelect.description}
        />
      )}
    </PageLayout>
  );
};
