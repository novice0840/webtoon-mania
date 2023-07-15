use naverwebtoon_analyzer;
drop table if exists webtoon_base_info, webtoon_chapter_info, webtoon_bestcomment_info;
CREATE TABLE `webtoon_base_info` (
	`id`	int	NOT NULL	COMMENT '각 웹툰고유의 숫자코드',
	`title`	varchar(100)	NULL	COMMENT '웹툰 제목',
	`author`	varchar(50)	NULL	COMMENT '작가명',
	`day_of_week`	varchar(100)	NULL	COMMENT '웹툰의 출시 요일 , 요일이 복수개인 경우가 있으므로 array를 string으로 변환해서 저장',
	`thumbnail`	varchar(500)	NULL	COMMENT '웹툰 썸네일 링크',
	`interest_count`	int	NULL	DEFAULT 0	COMMENT '해당 웹툰을 관심있어하는 독자수',
	`star_score`	float	NULL	DEFAULT 0	COMMENT '해당 웹툰의 별점 - 최근 몇개 화의 평균을 낸것으로 보임(추정)',
	`description`	text	NULL	COMMENT '해당 웹툰에 대한 기본 설명',
	`tags`	varchar(100)	NULL	COMMENT '각 웹툰에 tag들을 array 형태로 만들어 string으로 변환 후 저장'
);

CREATE TABLE `webtoon_chapter_info` (
	`id`	int	NOT NULL	COMMENT '각 회차마다 있는 숫자값',
	`webtoon_id`	int	NOT NULL	COMMENT '각 웹툰고유의 숫자코드',
	`name`	varchar(100)	NOT NULL	COMMENT '실제 화면에 보여지는 회차 이름',
	`average_star`	float	NULL	DEFAULT 0	COMMENT '받은 별점을 인원수로 나눈 평균값',
	`upload_data`	date	NULL,
	`thumbnail`	varchar(500)	NULL,
	`comment_number`	varchar(100)	NULL,
	`like_count`	int	NULL	DEFAULT 0	COMMENT '좋아요 개수',
	`total_star`	float	NULL	DEFAULT 0	COMMENT '받은 별점의 총합'
);

CREATE TABLE `webtoon_bestcomment_info` (
	`id`	int	NOT NULL	COMMENT '각 댓글마다 있는 숫자값',
	`chapter_id`	int	NOT NULL	COMMENT '각 회차마다 있는 숫자값',
	`webtoon_id`	int	NOT NULL	COMMENT '각 웹툰고유의 숫자코드',
	`upload_datetime`	datetime	NULL	COMMENT '댓글이 씌여진 시점',
	`writer`	varchar(100)	NULL,
	`text`	varchar(100)	NULL,
	`like_count`	int	NULL	DEFAULT 0,
	`dislike_count`	int	NULL	DEFAULT 0
);

ALTER TABLE `webtoon_base_info` ADD CONSTRAINT `PK_WEBTOON_BASE_INFO` PRIMARY KEY (
	`id`
);

ALTER TABLE `webtoon_chapter_info` ADD CONSTRAINT `PK_WEBTOON_CHAPTER_INFO` PRIMARY KEY (
	`id`,
	`webtoon_id`
);

ALTER TABLE `webtoon_bestcomment_info` ADD CONSTRAINT `PK_WEBTOON_BESTCOMMENT_INFO` PRIMARY KEY (
	`id`,
	`chapter_id`,
	`webtoon_id`
);

ALTER TABLE `webtoon_chapter_info` ADD CONSTRAINT `FK_webtoon_base_info_TO_webtoon_chapter_info_1` FOREIGN KEY (
	`webtoon_id`
)
REFERENCES `webtoon_base_info` (
	`id`
);

ALTER TABLE `webtoon_bestcomment_info` ADD CONSTRAINT `FK_webtoon_chapter_info_TO_webtoon_bestcomment_info_1` FOREIGN KEY (
	`chapter_id`
)
REFERENCES `webtoon_chapter_info` (
	`id`
);

ALTER TABLE `webtoon_bestcomment_info` ADD CONSTRAINT `FK_webtoon_chapter_info_TO_webtoon_bestcomment_info_2` FOREIGN KEY (
	`webtoon_id`
)
REFERENCES `webtoon_chapter_info` (
	`webtoon_id`
);