import { useEffect, useState } from "react";
import useManageGame from "../contexts/useManageGame";
import axios from "axios";
import useObtainFile from "./useObtainFile";

const useGenerate = () => {
  const { generation } = useManageGame();
  const { isLoadingInfo, pokeInfo } = useObtainFile();

  const genRanges = [
    [1, 151],
    [152, 251],
    [252, 386],
    [387, 493],
    [494, 649],
  ];

  // useStates to store current values
  const [currQuestion, setCurrQuestion] = useState(() => {
    return sessionStorage.getItem("currQuestion") || "";
  });

  const [answer, setAnswer] = useState(() => {
    return JSON.parse(sessionStorage.getItem("answer")) || {};
  });

  const [hintList, setHintList] = useState([]);

  // function to generate a random id within a valid range;
  const generateRandomID = () => {
    const rangeIndex = generation - 1;
    const min = genRanges[rangeIndex][0];
    const max = genRanges[rangeIndex][1];

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // helper function to remove answer from flavor text if present
  const refactorQuestion = (question, name) => {
    const regex = new RegExp(name, "gi");
    const finalStr = question.replace(regex, "This Pokemon");

    return finalStr;
  };

  const capitilizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const generateHints = async () => {
    const answerId = answer.id;
    const answerName = answer.name;

    let pokeColor;
    let pokeGenera;

    const hint1 = {
      number: 1,
      hint: `Starts with a ${atob(answerName).charAt(0).toUpperCase()}`,
    };

    if (!pokeInfo.hasOwnProperty(answerId)) {
      return;
    }

    const pokeObj = pokeInfo[answerId];
    const pokeUrl = pokeObj["species_url"];

    try {
      const res = await axios.get(pokeUrl);

      pokeColor = res.data.color.name;
      const pokeGeneraEn = res.data.genera.find(
        (genera) => genera.language.name === "en"
      );

      pokeGenera = pokeGeneraEn.genus;
    } catch (err) {
      console.error("Could not obtain url");
      return;
    }

    const hint2 = {
      number: 2,
      hint: `They are ${pokeColor}`,
    };

    const hint3 = {
      number: 3,
      hint: `Known as the ${pokeGenera}`,
    };

    setHintList([hint1, hint2, hint3]);
  };

  const generateQuestionRound = async () => {
    // on question/answer generation, store all information within an object and put within sessionStorage;
    let validUrl;
    let pokemonName;

    // generate a random id
    const randomId = generateRandomID();
    console.log(randomId);

    if (pokeInfo.hasOwnProperty(randomId)) {
      const validObject = pokeInfo[randomId];
      validUrl = validObject["species_url"];
      pokemonName = capitilizeName(validObject["name"]);
      console.log(pokemonName);

      const answerObject = {
        id: randomId,
        name: btoa(pokemonName),
      };

      sessionStorage.setItem("answer", JSON.stringify(answerObject));
      setAnswer(answerObject);
    } else {
      console.log("Object Id is not valid");
      return;
    }

    // obtain flavor text for question
    try {
      const res = await axios.get(validUrl);
      const flavorTexts = res.data.flavor_text_entries;

      const engFlavorText = flavorTexts.find(
        (entry) => entry.language.name === "en"
      );
      const flavorText = refactorQuestion(
        engFlavorText.flavor_text,
        pokemonName
      );

      sessionStorage.setItem("currQuestion", flavorText);
      setCurrQuestion(flavorText);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffects to generate information
  useEffect(() => {
    if (!isLoadingInfo && Object.keys(answer).length === 0) {
      generateQuestionRound();
    } else if (!isLoadingInfo && currQuestion !== "") {
      console.log(currQuestion);
      console.log(answer);
    }
  }, [isLoadingInfo]);

  useEffect(() => {
    if (Object.keys(answer).length !== 0) {
      generateHints();
    }
  }, [isLoadingInfo, answer]);

  return { hintList, currQuestion, answer, generateQuestionRound };
};

export default useGenerate;
