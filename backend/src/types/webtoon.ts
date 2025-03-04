import { PLATFORMS } from 'src/common/constants/webtoon';

export type Platform = (typeof PLATFORMS)[number];

export interface WebtoonFilter {
  platform?: string;
  illustrator?: string;
  writer?: string;
  genre?: string;
}
