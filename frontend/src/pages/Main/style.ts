import styled from "styled-components";

const MainWrapper = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const WeekdayColumn = styled.div`
  text-align: center;

  .day {
    color: #222;
    font-weight: normal;
    margin-bottom: 30px;
  }
`;

export { MainWrapper, WeekdayColumn };
