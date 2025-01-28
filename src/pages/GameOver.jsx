import { useLocation, useNavigate } from "react-router-dom";
import { GenButton, MainBody } from "../styles";
import { useEffect } from "react";
import useManageGame from "../contexts/useManageGame";
import styled from "styled-components";

// styles
const ResultHeader = styled.h1`
    font-size: xxx-large;
    font-weight: 300;
    margin-bottom: 30px;

`;

const CountResult = styled.p`
    font-size: medium;
    font-weight: 200;
    margin-bottom: 40px;
`;

const GameOver = () => {
    const { resetGame } = useManageGame();
    const location = useLocation();
    const nav = useNavigate();

    const result = location.state?.win;
    const numObtained = location.state?.numObtained;
    const numPokemon = location.state?.numPokemon;

    // if result is not in state, send to home
    useEffect(() => {
        resetGame();
        if(!location.state){
            nav("/");
        }
    }, [])

    return(
        <MainBody>
            <ResultHeader>{result ? "You Won!" : "You Lost"}</ResultHeader>
            {!result ?
                <CountResult>{`You have obtained ${numObtained} out of ${numPokemon} Pokemon`}</CountResult>
                :
                <CountResult>You have obtained all Pokemon! Congrats!</CountResult>
            }
            <GenButton onClick={() => nav("/gameSelect")}>New Game</GenButton>
        </MainBody>
    );

}

export default GameOver;