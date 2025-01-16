import Fetch from './fetch';
import { KMAS_WEBTOONLIST_BASE_URL } from '../constants/api';

export const crawlingWebtoons = async (platform: string, prvKey: string) => {
  const params = {
    prvKey,
    pltfomCdNm: platform,
    viewItemCount: 100,
    pageNo: 0,
  };

  const firstPageResponse = await Fetch.get(KMAS_WEBTOONLIST_BASE_URL, params);
  const totalPage = Math.ceil(
    parseInt(firstPageResponse.result.totalCount) / 100,
  );

  const allWebtoons = [];

  for (let pageNo = 0; pageNo < totalPage; pageNo++) {
    params.pageNo = pageNo;
    const pageResponse = await Fetch.get(KMAS_WEBTOONLIST_BASE_URL, params);

    const pageWebtoons = pageResponse.itemList
      .filter((item) => item.ageGradCdNm !== '19세 이상')
      .map((item) => ({
        title: item.title,
        writer: item.sntncWritrNm,
        illustrator: item.pictrWritrNm,
        genre: item.mainGenreCdNm,
        platform: item.pltfomCdNm,
        thumbnailURL: item.imageDownloadUrl,
      }));

    allWebtoons.push(...pageWebtoons);
  }

  return allWebtoons;
};
