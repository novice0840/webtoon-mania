import styled from "styled-components";

const BestCommentsWrapper = styled.div`
  border-bottom: 1px solid;
  margin-bottom: 5px;
  .bestcomment-name {
    font-size: 13px;
    color: #2a2a2a;
  }
  .bestcomment-date,
  .bestcomment-like,
  .bestcomment-dislike {
    font-size: 12px;
  }
  .bestcomment-like,
  .bestcomment-dislike {
    border: 1px solid #ededed;
    margin-right: 20px;
  }
`;

export { BestCommentsWrapper };
