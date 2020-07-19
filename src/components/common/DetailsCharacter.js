import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";

const Details = styled.div`
  display: flex;
  flex-direction: row;
  pointer-events: all;
  position: relative;
  background: red;
`;

const StyledPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex: 25%;
`;

const Title = styled.h4`
  color: ${p => (p.dark ? "#000" : "#fff")};
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 0.5rem;
  }
`;

const ContainerDescription = styled.div`
  flex: 75%;
`;

const Date = styled.div`
  color: #ccc;
  font-weight: 300;
  margin: 6px 0;
`;

const Description = styled.p`
  color: #fff;
  font-weight: 300;
`;

export function DetailsCharacter({}) {
  return (
    <Details>
      <StyledPhoto src="https://s3-us-west-1.amazonaws.com/welcome_apples/posts/1_card/apple.jpg" />
      <div></div>
      <ContainerDescription>
        <Title dark>holaa</Title>

        <Description>
          There's a new Iron Man in town, and his name is...Victor Von Doom! The
          greatest villain of the Marvel Universe is no stranger to armor, but
          now he's trying something new on for size. And where Tony Stark
          failed, Doom will succeed. But what is Doom's master plan? As the
          secrets that propel Victor's new quest as a hero start to reveal
          themselves, a who's who of heroes and villains start looking for a
          piece of revenge for Doom's past sins - beginning with bashful,
          blue-eyed Ben Grimm, the ever-lovin' Thing! Next up at bat is someone
          from Tony's past who has a big problem with Doom taking on the Iron
          mantle - but where has Pepper Potts, a.k.a. Rescue, been until now?
          The saga of Iron Man takes its strangest turn yet! Collecting Infamous
          Iron Man #1-6.
        </Description>
      </ContainerDescription>
    </Details>
  );
}
