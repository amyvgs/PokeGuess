import styled from "styled-components";
import { CommonHeader } from "../styles";

const BackDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 0.5));
  z-index: 20;
  position: fixed;
  inset: 0px;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5),
    0 8px 10px -6px rgb(0 0 0 / 0.5);
  width: 50%;
  height: 75%;
  background-color: white;
  z-index: 30;
  position: fixed;
  overflow-y: scroll;
  padding: 25px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const DisplayGrid = styled.div`
  display: grid;
  width:100%;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PokemonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap-10px;
  column-span: 1;
  font-size: small;
  font-weight: 500;
  color: black;
  border: 1px solid;
  border-radius: 20px;
  padding: 12px;
  border-color: oklch(0.928 0.006 264.531);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  &:hover{
    cursor: pointer;
    opacity: 0.5;
  }

`;

const CountDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  font-weight: 200;
  font-size: x-large;
  color: oklch(0.707 0.022 261.325);

  @media (max-width: 768px) {
    font-size: large;
  }
`;

const PokedexModal = ({
  setToggled,
  obtainedPokemon,
  numObtained,
  numPokemon,
}) => {
  const capitilizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <BackDiv onClick={() => setToggled(false)}>
      <MainDiv onClick={(e) => e.stopPropagation()}>
        <CommonHeader style={{ marginBottom: "30px" }}>
          Your Pokedex
        </CommonHeader>
        <CountDiv>{`Pokemon Obtained: ${numObtained} / ${numPokemon}`}</CountDiv>

        <DisplayGrid>
          {obtainedPokemon.map((pokemon, index) => {
            return (
              <PokemonDiv key={index}>
                <img src={pokemon.image} height={70} width={70} />
                {capitilizeName(pokemon.name)}
              </PokemonDiv>
            );
          })}
        </DisplayGrid>
      </MainDiv>
    </BackDiv>
  );
};

export default PokedexModal;
