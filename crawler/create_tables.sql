CREATE TABLE `webtoon_base_info` (
	`id`	int(20)	NOT NULL	COMMENT '각 웹툰고유의 숫자코드',
	`title`	varchar(100)	NOT NULL,
	`day`	varchar(100)	NOT NULL,
	`thumbnail`	varchar(100)	NOT NULL
);

CREATE TABLE `webtoon_chapter_info` (
	`id`	int(20)	NOT NULL	COMMENT '각 회차마다 있는 숫자값',
	`webtoon_id`	int(20)	NOT NULL	COMMENT '각 웹툰고유의 숫자코드',
	`name`	varchar(100)	NOT NULL	COMMENT '실제 화면에 보여지는 회차 이름',
	`star`	float(10)	NULL,
	`upload_data`	date	NOT NULL,
	`thumbnail`	varchar(100)	NOT NULL,
	`comment_number`	varchar(100)	NOT NULL,
	`like`	varchar(100)	NULL
);

CREATE TABLE `webtoon_bestcomment_info` (
	`id`	int(20)	NOT NULL	COMMENT '각 댓글마다 있는 숫자값',
	`chapter_id`	int(20)	NOT NULL	COMMENT '각 회차마다 있는 숫자값',
	`webtoon_id`	int(20)	NOT NULL	COMMENT '각 웹툰고유의 숫자코드',
	`upload_datetime`	datetime	NOT NULL	COMMENT '댓글이 씌여진 시점',
	`writer`	varchar(100)	NULL,
	`text`	varchar(100)	NULL,
	`like`	int(20)	NULL	DEFAULT 0,
	`dislike`	int(20)	NULL	DEFAULT 0
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

