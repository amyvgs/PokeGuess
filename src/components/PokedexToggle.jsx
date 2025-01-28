// styles

import { useState } from "react";
import styled from "styled-components";
import PokedexModal from "./PokedexModal";
import { createPortal } from "react-dom";
import pokedexIcon from "../assets/pokedex.png";

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 100%;
  justify-content: flex-end;
  padding: 10px;
  z-index: 10;
`;

const PokedexBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  font-weight: bold;
  z-index: 10;

  &:hover {
    background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
    cursor: pointer;
  }
`;

const PokedexToggle = ({ numPokemon, numObtained, obtainedPokemon }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <DivContainer
        onClick={() => {
          setToggled(true);
        }}
      >
        <PokedexBtn>
          <img src={pokedexIcon} width={40} height={40}/>
        </PokedexBtn>
      </DivContainer>

      {toggled &&
        createPortal(
          <PokedexModal
            setToggled={setToggled}
            obtainedPokemon={obtainedPokemon}
            numObtained={numObtained}
            numPokemon={numPokemon}
          />,
          document.body
        )}
    </>
  );
};

export default PokedexToggle;
