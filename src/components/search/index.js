import React, { useEffect, useState } from "react";
import {
  PageLayout,
  CommonDetailsCharacter,
  Breadcrumb,
  TitleDescription,
  Grid,
  Card
} from "../common";
import { Container } from "../common/Search";
import { searchCharacters, resetSearch } from "../../actions/search";
import { getDetailsCharacter } from "../../actions";
import { useStateValue } from "../../store";
import Modal from "../characters/modalDetails";
const Search = props => {
  const [{ search }, dispatch] = useStateValue();

  useEffect(() => {
    searchCharacters(dispatch, props.match.params.id);
    return () => {
      dispatch(resetSearch());
    };
  }, []);
  let actions = [
    {
      path: "/",
      text: "search"
    }
  ];
  return (
    <PageLayout>
      <Container>
        <Breadcrumb actions={actions} />
        {search.complete && search.count === 0 ? (
          <>
            <TitleDescription dark>
              Sorry! We couldn't find any results to "{props.match.params.id}"{" "}
            </TitleDescription>{" "}
            <h2>
              If you're not happy with the results, please do another search
            </h2>
          </>
        ) : (
          <>
            <Grid>
              {search.results.length > 0 &&
                search.results.map((value, index) => {
                  let title = value.name;
                  return (
                    <Card
                      key={index}
                      title={value.name}
                      photo={
                        value.thumbnail.path + "." + value.thumbnail.extension
                      }
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
            <Modal />{" "}
          </>
        )}
      </Container>
    </PageLayout>
  );
};

export default Search;