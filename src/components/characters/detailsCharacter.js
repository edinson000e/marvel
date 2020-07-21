import React, { useEffect, useState, useRef } from "react";
import {
  PageLayout,
  CommonDetailsCharacter,
  ContainerLoading,
  ContainerError
} from "../common";
import { useStateValue } from "../../store";
import { searchCommic } from "../../actions";
let options = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
export const DetailsCharacter = props => {
  const [{ character }, dispatch] = useStateValue();
  const Ref = useRef();
  const [creator, setcreator] = useState([]);
  const [error, seterror] = useState(false);
  const is_numeric = value => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  useEffect(() => {
    let role = [];
    window.scrollTo(0, Ref);
    if (
      character.dataSelect &&
      character.dataSelect.creators &&
      character.dataSelect.creators.items &&
      character.dataSelect.creators.items.length > 0
    ) {
      console.log("hago entro acaa en roles");
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
    } else {
      if (is_numeric(props.match.params.id))
        searchCommic(dispatch, props.match.params.id);
      else {
        seterror(true);
      }
    }
  }, [character]);
  return (
    <PageLayout ref={Ref}>
      {!error && !character.errorSelect ? (
        Object.entries(character.dataSelect).length === 0 ? (
          <ContainerLoading />
        ) : (
          <>
            <CommonDetailsCharacter
              title={character.dataSelect.title}
              url={
                character.dataSelect.thumbnail.path +
                "." +
                character.dataSelect.thumbnail.extension
              }
              subTitle={creator}
              description={character.dataSelect.description}
              actions={[
                {
                  path: "/",
                  text: character.dataSelect.title
                }
              ]}
            />
          </>
        )
      ) : (
        <ContainerError
          title={
            character.errorSelect
              ? " Sorry! We couldn't find any results."
              : "There was a search error."
          }
          subTitle="Please try again"
          onClick={() => seterror(false)}
        />
      )}
    </PageLayout>
  );
};
