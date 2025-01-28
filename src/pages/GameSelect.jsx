import styled from "styled-components";
import { MainBody } from "../styles";
import { fadeIn } from "../styles";
import { useNavigate } from "react-router-dom";
import useManageGame from "../contexts/useManageGame";

//styles
const GenDiv = styled.div`
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-radius: 50px;
  border: solid rgb(156 163 175 / var(--tw-bg-opacity, 1));
  width: 30%;
  height: 60px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin-bottom: 15px;
  opacity: 0;

  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.$delay}s;

  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 15px -3px lightblue, 0 4px 6px -4px lightblue;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const InstructionLabel = styled.h1`
  font-weight: 300;
  margin-bottom: 15px;
  font-size: xxx-large;

  @media (max-width: 768px) {
    font-size: x-large;
  }
`;

const GameSelect = () => {
  const nav = useNavigate();
  const {setGeneration} = useManageGame();

  const navigateStart = (generation) => {
    setGeneration(generation);
    nav("/gameStart", {replace: true});
  }

  // useNavigation to gameStart page, passing user selection within state. check for the presence of this state in useEffect of that page

  // static values for generations -> make short name appear on smaller media queries
  const generations = [
    {
      name: "Generation I",
      shortName: "Gen I",
      value: 1,
      sprite:
        "https://img.pokemondb.net/sprites/black-white/normal/charmander.png",
    },
    {
      name: "Generation II",
      shortName: "Gen II",
      value: 2,
      sprite:
        "https://img.pokemondb.net/sprites/black-white/normal/totodile.png",
    },
    {
      name: "Generation III",
      shortName: "Gen III",
      value: 3,
      sprite:
        "https://img.pokemondb.net/sprites/black-white/normal/treecko.png",
    },
    {
      name: "Generation IV",
      shortName: "Gen IV",
      value: 4,
      sprite:
        "https://img.pokemondb.net/sprites/black-white/normal/chimchar.png",
    },
    {
      name: "Generation V",
      shortName: "Gen V",
      value: 5,
      sprite:
        "https://img.pokemondb.net/sprites/black-white/normal/oshawott.png",
    },
  ];

  return (
    <MainBody>
      <InstructionLabel>Choose A Generation:</InstructionLabel>

      {generations.map((gen, index) => {
        return (
          <GenDiv onClick={() => navigateStart(gen.value)} key={index} $delay={index * 0.3}>
            {gen.name}
            {gen.sprite && <img height={65} width={65} src={gen.sprite} />}
          </GenDiv>
        );
      })}
    </MainBody>
  );
};

export default GameSelect;
