import { useEffect, useState } from "react";
import useManageGame from "../contexts/useManageGame";

const usePokedex = () => {
  const { generation } = useManageGame();
  const [pokedex, setPokedex] = useState({});
  const [numPokemon, setNumPokemon] = useState(0);

  const [numObtained, setNumObtained] = useState(() => {
    const userPokemon = JSON.parse(sessionStorage.getItem("obtained"));
    return userPokemon ? userPokemon.length : 0;
  });

  const [obtainedPokemon, setObtainedPokemon] = useState(() => {
    return JSON.parse(sessionStorage.getItem("obtained")) || [];
  });

  // function to add pokemon to obtainedPokemon list
  const updateObtained = (id) => {
    // if pokemon has already been obtained, return;
    if(!!obtainedPokemon.find((pokemon) => pokemon.id === id)) return;

    const pokemonObj = pokedex[id];
    const finalPokeObj = {
      id: id,
      ...pokemonObj,
    };

    setNumObtained(numObtained + 1);
    setObtainedPokemon((prev) => [...prev, finalPokeObj]);
    sessionStorage.setItem(
      "obtained",
      JSON.stringify([...obtainedPokemon, finalPokeObj])
    );
  };

  // useEffect to properly store values within pokedex
  useEffect(() => {
    const initializePokedex = async () => {
      // dynamic import
      const data = await import(`../static/generation_${generation}.json`);

      setNumPokemon(Object.keys(data.default).length);
      setPokedex({ ...data.default });
    };

    initializePokedex();
  }, [generation]);

  return { obtainedPokemon, numPokemon, numObtained, updateObtained };
};

export default usePokedex;
