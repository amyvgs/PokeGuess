import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokedexToggle from "../components/PokedexToggle";
import useGenerate from "../hooks/useGenerate";
import styled from "styled-components";
import { MainBody } from "../styles";
import useManageGame from "../contexts/useManageGame";
import HPbar from "../components/HPbar";
import RoundResult from "../components/RoundResult";
import usePokedex from "../hooks/usePokedex";
import HintBox from "../components/HintBox";
import stringSimilarity from "string-similarity-js";

// styles

const QuestionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: large;
  text-align: center;
  border: 1px solid;
  border-radius: 40px;
  border-color: black;
  border-width: medium;
  width: 60%;
  height: 30%;
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 50px;
  background-color: oklch(0.872 0.01 258.338);

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    width: 70%;
  }
`;

const PokeInput = styled.input`
  width: 80%;
  height: 40px;

  padding: 10px;

  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
`;

const SubmitBtn = styled.button`
  width: 20%;
  height: 40px;
  background-color: rgb(137, 207, 240);
  font-size: medium;
  font-weight: 600;
  color: white;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;

  &:hover{
    cursor:pointer;
  }
`;

const HintContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 70%;
  gap: 1em;
`;

const GameStart = () => {
  const { numObtained, numPokemon, obtainedPokemon, updateObtained } = usePokedex();
  const { points, isValid } = useManageGame();
  const { hintList, currQuestion, answer, generateQuestionRound } = useGenerate();

  const nav = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({});

  // cannot access game if game state is invalid
  useEffect(() => {
    if (!isValid) {
      nav("/gameSelect");
    }
  }, []);

  useEffect(() => {
    if (points === 0) {
      nav("/gameEnd", {state: {win: false, numObtained: numObtained, numPokemon: numPokemon}, replace: true});
    }
  }, [points]);

  const evaluateAnswer = () => {
    const correctAnswer = atob(answer.name);
    if (stringSimilarity(correctAnswer, userInput) >= 0.8)
      updateObtained(answer.id);

    if (numObtained + 1 === numPokemon) {
      nav("/gameEnd", { state: { win: true }, replace: true });
    }

    setResult({
      correct: stringSimilarity(correctAnswer, userInput) >= 0.8,
      name: atob(answer.name),
    });

    setShowResult(true);
    setUserInput("");
  };

  return (
    <>
      <MainBody style={{ justifyContent: "flex-start" }}>
        <PokedexToggle
          obtainedPokemon={obtainedPokemon}
          numObtained={numObtained}
          numPokemon={numPokemon}
        />
        <HPbar />

        <QuestionBox>{currQuestion}</QuestionBox>

        <InputDiv>
          <PokeInput
            placeholder="Enter Pokemon Name"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <SubmitBtn onClick={evaluateAnswer}>Enter</SubmitBtn>
        </InputDiv>

        <HintContainer>
          {hintList.map((hint, index) => {
            return <HintBox key={index} hint={hint}></HintBox>;
          })}
        </HintContainer>
      </MainBody>

      {showResult && (
        <RoundResult
          result={result}
          setShowResult={setShowResult}
          generateQuestionRound={generateQuestionRound}
        />
      )}
    </>
  );
};

export default GameStart;
