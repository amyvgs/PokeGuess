import { useEffect, useState } from "react";
import styled from "styled-components";
import useManageGame from "../contexts/useManageGame";

const BackDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 0.5));
  z-index: 20;
  position: fixed;
  inset: 0px;
`;

const ResultHeader = styled.h1`
  font-weight: 900;
  font-size: xxx-large;
  margin-bottom: 50px;

  color: ${(props) => (props.result === "true" ? "#98FF98" : "#ff746c")};
`;

const SubResultDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 60%;
  height: 70px;
  background-color: white;
  gap: 0 20px;
`;

const RoundResult = ({ result, setShowResult, generateQuestionRound }) => {
  const { incrementStreak, streak, increment, decrement } = useManageGame();
  const [extra, setExtra] = useState("");

  const evaluateGame = () => {
    if (result.correct && streak + 1 === 3) {
      increment();
    } else if (!result.correct) {
      decrement();
    } else{
      incrementStreak();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      evaluateGame();
      setShowResult(false);
      generateQuestionRound();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <BackDiv>
      <ResultHeader result={result.correct.toString()}>
        {result.correct ? "Correct!" : "Incorrect!"}
      </ResultHeader>

      <SubResultDiv>
        <span style={{ fontSize: "large", fontWeight: "600" }}>
          {result.correct ? "Obtained: " : "Correct Answer: "}
        </span>
        {result.name}
      </SubResultDiv>
    </BackDiv>
  );
};

export default RoundResult;
