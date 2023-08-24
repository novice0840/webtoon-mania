import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { naverCurrentWebtoonsURL } from 'src/constants';
@Injectable()
export class NaverCrawlerService {
  private async crawlingPage(webtoonId, pageNumber) {
    const response = await axios.get(
      `https://comic.naver.com/api/article/list?titleId=${webtoonId}&page=${pageNumber}`,
    );
    return response.data.articleList.map((article) => ({
      id: article.no,
      webtoonId,
      name: article.subtitle.replaceAll(/['"]/g, ' '),
      uploadDate: article.serviceDateDescription,
      thumbnail: article.thumbnailUrl,
      starScore: article.starScore,
    }));
  }

  private async getTotalPage(webtoonId: string): Promise<number> {
    const response = await axios.get(`https://comic.naver.com/api/article/list?titleId=${webtoonId}
      `);
    const { totalPages: pageNumber } = response.data.pageInfo;
    return pageNumber;
  }

  async cralwingCurrentWebtoonBase() {
    const overlapCheckList = [];
    const response = await axios.get(naverCurrentWebtoonsURL);
    const webtoonBases = Object.values(response.data.titleListMap)
      .flatMap((webtoon) => webtoon as any[])
      .filter((webtoon) => {
        if (overlapCheckList.includes(webtoon.titleId) || webtoon.adult) {
          return false;
        } else {
          overlapCheckList.push(webtoon.titleId);
          return true;
        }
      })
      .map((webtoon) => ({
        id: String(webtoon.titleId),
        title: webtoon.titleName,
        thumbnail: webtoon.thumbnailUrl,
        starScore: webtoon.starScore,
        platform: 'naver',
        isEnd: false,
        link: `https://comic.naver.com/webtoon/list?titleId=${webtoon.titleId}`,
      }));
    const webtoons = [];
    let i = 1;
    for await (const webtoonBase of webtoonBases) {
      const detail = await this.cralwingWebtoonDetail(webtoonBase.id);
      const webtoon = { ...webtoonBase, ...detail };
      webtoons.push(webtoon);
      console.log(`naver webtoon ${i}개 크롤링 완료`);
      i = i + 1;
    }
    return webtoons;
  }

  async crawlingEndWebtoonBase() {
    const response = await axios.get(`https://comic.naver.com/api/webtoon/titlelist/finished`);
    const totalPageNumber = response.data.pageInfo.totalPages;
    let webtoonBases = [];
    const pageList = Array.from({ length: totalPageNumber }, (_, index) => index + 1);
    for await (const page of pageList) {
      const res = await axios.get(`https://comic.naver.com/api/webtoon/titlelist/finished?page=${page}`);
      const pageWebtoons = res.data.titleList
        .filter((webtoon) => !webtoon.adult)
        .map((webtoon) => ({
          id: String(webtoon.titleId),
          title: webtoon.titleName,
          author: webtoon.author,
          starScore: webtoon.starScore,
          name: webtoon.titleName,
          thumbnail: webtoon.thumbnailUrl,
          viewCount: webtoon.viewCount,
          platform: 'naver',
          isEnd: true,
          link: `https://comic.naver.com/webtoon/list?titleId=${webtoon.titleId}`,
        }));
      webtoonBases = webtoonBases.concat(pageWebtoons);
    }

    const webtoons = [];
    let i = 1;
    for await (const webtoonBase of webtoonBases) {
      const detail = await this.cralwingWebtoonDetail(webtoonBase.id);
      const webtoon = { ...webtoonBase, ...detail };
      webtoons.push(webtoon);
      console.log(`네이버 완결 웹툰 ${i}개 크롤링 완료`);
      i = i + 1;
    }
    return webtoons;
  }

  async cralwingWebtoonDetail(webtoonId) {
    const response = await axios.get(`
      https://comic.naver.com/api/article/list/info?titleId=${webtoonId}`);
    const dayOfWeeks = response.data.publishDayOfWeekList.map(
      (day) => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(),
    );
    const tags = response.data.curationTagList.map((tag) => tag.tagName);
    const description = response.data.synopsis.replaceAll(/['"]/g, ' ');
    const interestCount = response.data.favoriteCount;
    const authorInfo: any[] = Object.values(response.data.author).flatMap((author) => author);
    const authorName = authorInfo.map((author) => author.name);
    return { dayOfWeeks, tags, description, interestCount, authors: authorName };
  }

  // 모든 page를 돌며 모든 chapter를 크롤링하는 함수
  async crawlingChapters(webtoonId) {
    let chapters = [];
    const totalPageNumber = await this.getTotalPage(webtoonId);
    const pageList = Array.from({ length: totalPageNumber }, (_, index) => index + 1);
    for await (const page of pageList) {
      const articles = await this.crawlingPage(webtoonId, page);
      chapters = chapters.concat(articles);
    }
    return chapters;
  }

  // 가장 최근 페이지만 크롤링
  async crawlingRecentPage(webtoonId) {
    let chapters = [];
    const articles = await this.crawlingPage(webtoonId, 1);
    chapters = chapters.concat(articles);
    return chapters;
  }
}
