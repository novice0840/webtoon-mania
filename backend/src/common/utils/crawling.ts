import Fetch from './fetch';
import { KMAS_WEBTOONLIST_BASE_URL } from '../constants/api';

interface Webtoon {
  title: string;
  writer: string;
  illustrator: string;
  genre: string;
  platform: string;
  thumbnailURL: string;
}

const getWebtoonTotalCount = async (url, params) => {
  const response = await Fetch.get(url, params);
  const totalCount = parseInt(response.result.totalCount);
  return totalCount;
};

const transformWebtoonData = (item) => ({
  title: item.title,
  writer: item.sntncWritrNm,
  illustrator: item.pictrWritrNm,
  genre: item.mainGenreCdNm,
  platform: item.pltfomCdNm,
  thumbnailURL: item.imageDownloadUrl,
  synopsis: item.outline
    ?.replaceAll('\r', '')
    .replaceAll('\n', '')
    .replaceAll('\t', ''),
});

export const crawlingWebtoons = async (
  platform: string,
  prvKey: string,
): Promise<Webtoon[]> => {
  const params = {
    prvKey,
    pltfomCdNm: platform,
    viewItemCnt: 100,
    pageNo: 0,
  };

  const totalCount = await getWebtoonTotalCount(
    KMAS_WEBTOONLIST_BASE_URL,
    params,
  );
  const allWebtoons = [];

  // 만화진흥원의 API는 totalCount와 페이지 수가 같음
  for (let pageNo = 0; pageNo < totalCount; pageNo += 100) {
    params.pageNo = pageNo;
    const pageResponse = await Fetch.get(KMAS_WEBTOONLIST_BASE_URL, params);
    const pageWebtoons = pageResponse.itemList
      .filter(
        (item) =>
          item.ageGradCdNm !== '19세 이상' && item.ageGradCdNm !== '18세 이상',
      )
      .map(transformWebtoonData);
    allWebtoons.push(...pageWebtoons);
    console.log(`${platform} ${pageNo} 페이지 크롤링 완료`);
  }
  return allWebtoons;
};
