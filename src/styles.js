import styled, { keyframes } from "styled-components";

export const GenButton = styled.button`
  border-radius: 50px;
  width: 200px;
  height: 50px;
  backgrounf-color: red;

  &:hover {
    box-shadow: 10px 5px 5px lightblue;
    transform: scale(1.1);
    cursor:pointer;
  }
`;

export const MainBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 60px);
    overflow-x: hidden;
    overflow-y: hidden;
`;

export const CommonHeader = styled.h1`
  font-weight: 300;
  font-size: xxx-large;
  margin-top: 10px;
  
  @media (max-width: 768px){
    font-size: xx-large;
  }
`


// animations
export const fadeIn = keyframes`
  from{
    opacity: 0;
    transform: translateY(20px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;