import styled from "styled-components";

const WebtoonWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
`;

const WebtoonInfo = styled.div`
  display: flex;
  .thumb {
    width: 125px;
    height: 101px;
  }
  .title {
    font-size: 18px;
    color: #020202;
  }
  .title,
  .author,
  .description {
    margin-bottom: 5px;
  }
`;

const WebtoonContents = styled.div`
  .content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .content-thumb {
    width: 71px;
    height: 41px;
  }
  .best-comment {
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
  }
`;

export { WebtoonWrapper, WebtoonInfo, WebtoonContents };
