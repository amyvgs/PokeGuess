import styled from "styled-components";
import pokeball from "../assets/pokeball.png";
import { GenButton, MainBody } from "../styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const HomeBack = styled.div`
  background-size: 500px;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${pokeball});
  height: 75%;
  width: 75%;
  object-fit: cover;
  background-repeat: no-repeat;

  @media (max-width: 576px) {
    background-size: 300px;
  }
`;

const PokeHeader = styled.h1`
  margin-bottom: 30px;
  font-weight: 300;
  font-size: xxx-large;

  
`;

const Subheading = styled.h4`
  margin-top: 5px;
  margin-bottom: 20px;
  font-weight: 200;
`;

const Home = () => {
    const nav = useNavigate();

    const navigateSelection = () => {
        nav("/gameSelect", {replace:true});
    }

  return (
    <MainBody>
      <PokeHeader>PokeGuess</PokeHeader>
      <Subheading>
        Register All Pokemon by Getting their Entries correct
      </Subheading>
      <GenButton style={{ marginTop: "10px" }} onClick={navigateSelection}>Start</GenButton>
    </MainBody>
  );
};

export default Home;
