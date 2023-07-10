import styled from "styled-components";

const WebtoonListWrapper = styled.div`
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  .webtoon-box {
    margin: 5px;
    cursor: pointer;
  }
  img {
    width: 83px;
    height: 107px;
  }
  .title {
    width: 83px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export { WebtoonListWrapper };
