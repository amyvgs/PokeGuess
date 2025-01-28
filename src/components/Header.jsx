import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useManageGame from "../contexts/useManageGame";

 const AppHeader = styled.header`
   width: 100%;
   height: 60px;
   background-color: lightblue;
   color: white;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 20px;
   position: sticky;
   top: 0;
   z-index: 1000;
   overflow-x: hidden;
 `;

 const HeaderTitle = styled.h1`
   font-size: 1.5rem;
   margin: 0;

   &:hover{
    cursor:pointer;
   }
 `;

const Header = () => {
  const { resetGame } = useManageGame();
  const nav = useNavigate();
  const location = useLocation();

  const navigateHome = () => {
    // clear active game if user attempts to go home on game page
    if(location.pathname === "/gameStart"){
      resetGame();
    }
    
    nav("/")
  }

  return (
    <AppHeader>
        <HeaderTitle onClick={navigateHome}>PokeGuess</HeaderTitle>
    </AppHeader>
  );
};

export default Header;
