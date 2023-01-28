import styled from "styled-components";

const LayoutWrapper = styled.div`
  margin-top: 50px;

  header {
    width: 800px;
    text-align: center;
    margin: auto;
    font-size: 30px;
  }

  nav {
    width: 800px;
    display: flex;
    justify-content: space-between;
    margin: 50px auto;
    padding-bottom: 10px;
    border-bottom: 1px solid;
  }

  .selected-weekday {
    font-weight: bold;
    color: #00c85e;
    border-bottom: 2px solid #00d564;
  }

  .weekday {
    cursor: pointer;
  }
`;

export { LayoutWrapper };
