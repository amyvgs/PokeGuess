import styled from "styled-components";
import useManageGame from "../contexts/useManageGame";

// style
const HPContainer = styled.div`
  height: 70px;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 2px solid;
  border-color: #e2e8f0;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 15px;
  gap: 10px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  @media (max-width: 768px) {
    width: 70%;
  }
`;

const HPBackBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  width: 90%;
  height: 12px;
  background-color: gray;
`;

const HPbar = () => {
  const { points } = useManageGame();

  return (
    <HPContainer>
      HP
      <HPBackBar>
        <div
          style={{
            width: `${points}%`,
            height: "12px",
            backgroundColor: `${
              points >= 60 ? "#48BD42" : points >= 30 ? "#FFE860" : "#FF4E44"
            }`,
            borderRadius: "30px",
            transition: "all 1s ease-in-out"
          }}
        />
      </HPBackBar>
    </HPContainer>
  );
};

export default HPbar;
