const db_init = require("./database");

const insertWebtoons = async (webtoons) => {
  const connection = await db_init();
  try {
    for await (const webtoon of webtoons) {
      await connection.execute(`
      INSERT INTO webtoon_base_info (id, title, author, day_of_week, thumbnail, interest_count, star_score, description, tags)
      VALUES (${webtoon.id},"${webtoon.title}", "${webtoon.author}", '${JSON.stringify(webtoon.dayOfWeek)}', "${
        webtoon.thumbnail
      }", 
      ${webtoon.interestCount}, ${webtoon.starScore}, '${webtoon.description}', '${JSON.stringify(webtoon.tags)}')
      ON DUPLICATE KEY UPDATE title="${webtoon.title}", author="${webtoon.author}", day_of_week='${JSON.stringify(
        webtoon.dayOfWeek
      )}', thumbnail="${webtoon.thumbnail}", interest_count=${webtoon.interestCount}, star_score=${
        webtoon.starScore
      }, description="${webtoon.description}", tags='${JSON.stringify(webtoon.tags)}';
      `);
    }
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

const insertChapters = async (chapters) => {
  const connection = await db_init();
  try {
    for await (const chapter of chapters) {
      const uploadDate = `20${chapter.uploadDate.split(".")[0]}-${chapter.uploadDate.split(".")[1]}-${
        chapter.uploadDate.split(".")[2]
      }`;
      await connection.execute(`
      INSERT INTO webtoon_chapter_info (id, webtoon_id, name, average_star, total_star, upload_data, thumbnail)
      VALUES (${chapter.id}, ${chapter.webtoonId}, "${chapter.name}", ${chapter.averageStar}, ${chapter.totalStar}, "${uploadDate}", "${chapter.thumbnail}")
      ON DUPLICATE KEY UPDATE name = "${chapter.name}", average_star=${chapter.averageStar}, total_star=${chapter.totalStar},thumbnail="${chapter.thumbnail}";
      `);
    }
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

exports.insertWebtoons = insertWebtoons;
exports.insertChapters = insertChapters;
