import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Header from "./components/Header";
import GameSelect from "./pages/GameSelect";
import GameStart from "./pages/GameStart";
import GameOver from "./pages/GameOver";

const GlobalStyle = createGlobalStyle`
      *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
  
      html, body{
          font-family: 'Montserrat', sans-serif;
          width:100%;
          height:100%;
      }
  `;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameSelect" element={<GameSelect/>}/>
        <Route path="/gameStart" element={<GameStart/>}/>
        <Route path="/gameEnd" element={<GameOver/>}/>
      </Routes>
    </>
  );
}

export default App;
