import styled from "styled-components";
import hintIcon from "../assets/hint.png";
import { useEffect, useRef, useState } from "react";

// styles
const Container = styled.div`
  position: relative;
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HintButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 30px;
  height: 50px;
  width: 100%;
  border: 2px solid;
  border-color: oklch(0.924 0.12 95.746);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  padding: 0 40px;

  &:hover {
    cursor: pointer;
    opacity: 70%;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 5px;
    font-size: small;
    justify-content: center;
  }
`;

const HintDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 40px;
  background-color: oklch(0.928 0.006 264.531);
  margin-bottom: 50px;
  z-index: 10;
  margin-bottom: 100px;
  padding: 2px 10px;

  @media (max-width: 768px) {
    height: 100px;
    margin-bottom: 160px;
  }
`;

const HintBox = ({ hint }) => {

  const containerRef = useRef(null);
  const [revealHint, setRevealHint] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if(containerRef.current && !containerRef.current.contains(event.target)){
        setRevealHint(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [])

  return (
    <Container ref={containerRef}>
      {revealHint && <HintDiv>{hint.hint}</HintDiv>}

      <HintButton onClick={() => setRevealHint(!revealHint)}>
        {`Hint ${hint.number}`}
        <img src={hintIcon} height={30} width={30} />
      </HintButton>
    </Container>
  );
};

export default HintBox;
