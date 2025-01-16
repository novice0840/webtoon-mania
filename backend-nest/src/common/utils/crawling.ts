import { Platform } from 'src/types/webtoon';
import Fetch from './fetch';
import { KMAS_WEBTOONLIST_BASE_URL } from '../constants/api';

export const crawlingWebtoons = async (platform: Platform, prvKey) => {
  const params = {
    prvKey,
    pltfomCdNm: platform,
  };

  const data = await Fetch.get(KMAS_WEBTOONLIST_BASE_URL, params);
  return data;
};
